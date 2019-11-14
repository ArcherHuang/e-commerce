const validator = require('validator')
const moment = require('moment')
const db = require('../models')
const { Cart, CartItem, Coupon, CouponDistribution, Product, Discount } = db
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const notificationService = require('./admin/notificationService')

const cartService = {

  getCart: async (req, res, callback) => {
    try {

      // 驗證 cartId 是否存在，若不存在，先建立一個 cart 給使用者
      if (!req.session.cartId) {
        let cart = await Cart.create({
          where: { dataStatus: 1 }
        })
        req.session.cartId = cart.id
      }

      return Cart.findOne({
        where: {
          id: req.session.cartId
        },
        include: [
          CartItem,
          { model: Product, as: "items" },
        ]
      }).then(async cart => {
        // 計算購物車總金額
        cartService.checkTotalPrice(cart.id)

        // 取出 coupon 資訊
        let coupon
        if (cart.CouponDistributionId) {
          let couponDistribution = await CouponDistribution.findByPk(cart.CouponDistributionId)
          coupon = await Coupon.findByPk(couponDistribution.CouponId)
        }

        return callback({ status: 'success', message: '取得購物車資訊成功', cart: cart, coupon: coupon })
      }).catch(err => {
        console.log(`Err: ${err}`)
        return callback({ status: 'error', message: '取得購物車資訊失敗' })
      })
    }
    catch (err) {
      console.log(`Err: ${err}`)
      return callback({ status: 'error', message: '取得購物車資訊失敗' })
    }
  },

  postCart: async (req, res, callback) => {

    try {
      //驗證商品是否存在
      let product = await Product.findByPk(req.body.productId)

      //若商品存在，且庫存大於零
      if (product.inventory > 0) {

        //取得或建立新購物車
        await Cart.findOrCreate({
          where: {
            id: req.session.cartId || 0,
            dataStatus: 1                  // 不存在（已轉為訂單）0 存在 1 
          },
        }).spread(async function (cart, created) {

          // 將商品加入購物車
          await CartItem.findOrCreate({
            where: {
              CartId: cart.id,
              ProductId: req.body.productId
            },
            default: {
              CartId: cart.id,
              ProductId: req.body.productId
            }
          }).spread(async function (cartItem, created) {
            await cartItem.update({
              quantity: (cartItem.quantity || 0) + 1,
              dataStatus: 1
            }).then(async (cartItem) => {
              req.session.cartId = cart.id
              return req.session.save(async () => {

                //商品庫存減一
                await Product.findByPk(req.body.productId).then(product => {
                  product.update({
                    inventory: product.inventory - 1
                  }).then(product => {
                    // 檢查庫存
                    notificationService.checkInventory(product.id)
                    return callback({ status: 'success', message: '商品加入購物車成功' })
                  }).catch(err => {
                    return callback({ status: 'err', message: '降低存貨失敗', content: err })
                  })
                }).catch(err => {
                  return callback({ status: 'err', message: '找不到商品', content: err })
                })

                // 計算購物車總金額
                cartService.checkTotalPrice(cartItem.CartId)
              })
            }).catch(err => {
              return callback({ status: 'error', message: '商品加入購物車失敗', content: err })
            })
          })
        }).catch(err => {
          return callback({ status: 'error', message: '商品加入購物車失敗', content: err })
        })
      } else if (product.inventory === 0) {
        // 若商品庫存為零
        return callback({ status: 'error', message: '商品庫存為零，無法加入至購物車' })
      } else {
        //若商品不存在
        return callback({ status: 'error', message: '商品不存在' })
      }
    }
    catch (err) {
      return callback({ status: 'error', message: '商品加入購物車失敗' })
    }
  },

  addCartItem: async (req, res, callback) => {
    try {
      CartItem.findOne({
        where: {
          id: req.params.cartItem_id,
          dataStatus: 1
        }
      }).then(cartItem => {

        //檢查 cart item 是否存在
        if (cartItem) {
          //檢查商品庫存  
          Product.findByPk(cartItem.ProductId).then(product => {
            if (product.inventory === 0) {
              //若商品庫存為零
              return callback({ status: 'error', message: '商品已無庫存' })
            } else {
              ////若商品庫存不為零
              cartItem.update({
                quantity: cartItem.quantity + 1,
              }).then((cartItem) => {

                //商品庫存減一
                Product.findByPk(cartItem.ProductId).then(product => {
                  product.update({
                    inventory: product.inventory - 1
                  }).then(product => {
                    // 檢查庫存
                    notificationService.checkInventory(product.id)
                    return callback({ status: 'success', message: '新增商品數量成功' })
                  }).catch(err => {
                    return callback({ status: 'err', message: '降低存貨失敗', content: err })
                  })
                }).catch(err => {
                  return callback({ status: 'err', message: '找不到商品', content: err })
                })

                // 計算購物車總金額
                cartService.checkTotalPrice(cartItem.CartId)
              }).catch(err => {
                return callback({ status: 'error', message: '新增商品數量失敗' })
              })
            }
          })
        } else {
          //若 cart item 不存在
          return callback({ status: 'error', message: 'cart item 不存在' })
        }
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '新增商品數量失敗' })
    }
  },

  subCartItem: (req, res, callback) => {
    try {
      CartItem.findOne({
        where: {
          id: req.params.cartItem_id,
          dataStatus: 1
        }
      }).then(cartItem => {
        //檢查 cart item 是否存在
        if (cartItem) {
          //檢查購物車中的商品數量
          if (cartItem.quantity > 1) {
            cartItem.update({
              quantity: cartItem.quantity - 1 >= 1 ? cartItem.quantity - 1 : 1
            }).then((cartItem) => {

              //商品庫存加一
              Product.findByPk(cartItem.ProductId).then(product => {
                product.update({
                  inventory: product.inventory + 1
                }).then(product => {
                  // 計算購物車總金額
                  cartService.checkTotalPrice(cartItem.CartId)
                  // 檢查庫存
                  notificationService.checkInventory(product.id)
                  return callback({ status: 'success', message: '減少購物車商品數量成功' })
                }).catch(err => {
                  return callback({ status: 'err', message: '調整存貨失敗', content: err })
                })
              }).catch(err => {
                return callback({ status: 'err', message: '找不到商品', content: err })
              })

            }).catch(err => {
              return callback({ status: 'error', message: '減少購物車數量失敗' })
            })
          } else if (cartItem.quantity === 1) {
            //若購物車中的商品數量為1，回傳無法減少數量的訊息
            return callback({ status: 'error', message: '商品數量為 1，無法繼續減少商品數量' })
          } else {
            return callback({ status: 'error', message: '減少商品數量失敗' })
          }
        } else {
          //若 cart item 不存在
          return callback({ status: 'error', message: 'cart item 不存在' })
        }
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '減少商品數量失敗' })
    }
  },

  deleteCartItem: (req, res, callback) => {
    try {
      CartItem.findOne({
        where: {
          id: req.params.cartItem_id,
          dataStatus: 1
        }
      }).then(cartItem => {

        //紀錄當下商品數量
        let quantity = cartItem.quantity

        //檢查 cart item 是否存在
        if (cartItem) {
          cartItem.update({
            quantity: 0,
            dataStatus: 0
          }).then(cartItem => {

            //商品庫存調整
            Product.findByPk(cartItem.ProductId).then(product => {
              product.update({
                inventory: product.inventory + quantity
              }).then(product => {
                // 計算購物車總金額
                cartService.checkTotalPrice(cartItem.CartId)
                // 檢查庫存
                notificationService.checkInventory(product.id)
                return callback({ status: 'success', message: '移除購物車商品成功' })
              }).catch(err => {
                return callback({ status: 'err', message: '調整存貨失敗', content: err })
              })
            }).catch(err => {
              return callback({ status: 'err', message: '找不到商品', content: err })
            })
          }).catch(err => {
            return callback({ status: 'error', message: '移除購物車商品失敗' })
          })
        } else {
          //若 cart item 不存在
          return callback({ status: 'error', message: 'cart item 不存在' })
        }
      }).catch(err => {
        return callback({ status: 'error', message: '移除購物車商品失敗' })
      })
    }
    catch (err) {

    }
  },

  addCoupon: async (req, res, callback) => {
    try {
      // 確認 cart 是否存在
      let cart = await Cart.findByPk(req.session.cartId)

      // 確認 coupon 是否存在、數量是否大於等於1、是否過期
      let coupon = await Coupon.findOne({
        where: {
          sn: req.body.coupon_code,
          dataStatus: 1,
          numberOfLimitation: { [Op.gte]: 1 },
          expireDate: { [Op.gt]: moment() }
        }
      })
      // 確認使用者是否擁有該 coupon
      let couponDistribution = await CouponDistribution.findOne({
        where: {
          CouponId: coupon.id,
          UserId: req.user.id,
          usageStatus: "1"  // unused 1, used 2, expired 3, deleted 0
        }
      })
      console.log(`=== CART ===`)
      console.log(cart)
      console.log(`=== COUPON ===`)
      console.log(coupon)
      console.log(`=== CouponDistribution ===`)
      console.log(couponDistribution)

      if (cart && coupon && couponDistribution) {
        console.log(`=== THREE YES ===`)
        // 將 coupon 放入購物車
        await cart.update({
          CouponDistributionId: couponDistribution.id
        }).then(cart => {
          console.log(`成功將 coupon 放入購物車，Cart ID: ${cart.id}`)
        }).catch(err => {
          console.log(`將 coupon 放入購物車失敗`)
          return callback({ status: 'error', message: '加入 coupon 失敗', content: err })
        })

        // 更新 coupon 資訊
        await coupon.update({
          numberOfLimitation: coupon.numberOfLimitation - 1
        }).then(coupon => {
          console.log(`coupon (ID: ${coupon.id}) 資訊更新成功`)
        }).catch(err => {
          console.log(`coupon (ID: ${coupon.id}) 資訊更新失敗`)
          return callback({ status: 'error', message: '加入 coupon 失敗', content: err })
        })

        // 更新 couponDistribution 資訊
        await couponDistribution.update({
          usageStatus: "2", // unused 1, used 2, expired 3, deleted 0
        }).then(couponDistribution => {
          console.log(`couponDistribution (ID: ${couponDistribution.id}) 資訊更新成功`)
        }).catch(err => {
          console.log(`couponDistribution (ID: ${couponDistribution.id}) 資訊更新失敗`)
          return callback({ status: 'error', message: '加入 coupon 失敗', content: err })
        })
        // 計算購物車總金額
        cartService.checkTotalPrice(cart.id)
        return callback({ status: 'success', message: '加入 coupon 成功' })
      } else {
        // 回傳：將 coupon 放入購物車失敗
        return callback({ status: 'error', message: '加入 coupon 失敗，使用者無法使用該 coupon' })
      }
    }
    catch (err) {
      // 回傳：將 coupon 放入購物車失敗
      return callback({ status: 'error', message: '加入 coupon 失敗，使用者無法使用該 coupon', content: err })
    }
  },

  removeCoupon: async (req, res, callback) => {
    try {
      let cart = await Cart.findByPk(req.session.cartId)
      let couponDistribution = await CouponDistribution.findByPk(cart.CouponDistributionId)
      let coupon = await Coupon.findByPk(couponDistribution.CouponId)

      if (cart && couponDistribution && coupon) {
        // 更新 cart
        await cart.update({
          CouponDistributionId: null
        }).then(cart => {
          console.log(`更新 cart (ID: ${cart.id}) 成功`)
        }).catch(err => {
          console.log(`更新 cart (ID: ${cart.id}) 失敗`)
          return callback({ status: 'error', message: '從購物車中移除 coupon 失敗', content: err })
        })

        // 更新 couponDistribution
        await couponDistribution.update({
          usageStatus: 1  // unused 1, used 2, expired 3, deleted 0
        }).then(couponDistribution => {
          console.log(`更新 couponDistribution (ID: ${couponDistribution.id}) 成功`)
        }).catch(err => {
          console.log(`更新 couponDistribution (ID: ${couponDistribution.id}) 失敗`)
          return callback({ status: 'error', message: '從購物車中移除 coupon 失敗', content: err })
        })

        // 更新 coupon，數量加回ㄧ
        await coupon.update({
          numberOfLimitation: coupon.numberOfLimitation + 1
        }).then(coupon => {
          console.log(`更新 coupon (ID: ${coupon.id}) 成功`)
        }).catch(err => {
          console.log(`更新 coupon (ID: ${coupon.id}) 失敗`)
          return callback({ status: 'error', message: '從購物車中移除 coupon 失敗', content: err })
        })
        // 計算購物車總金額
        cartService.checkTotalPrice(cart.id)
        return callback({ status: 'success', message: '從購物車中移除 coupon 成功' })
      } else {
        return callback({ status: 'error', message: '從購物車中移除 coupon 失敗', content: err })
      }
    }
    catch (err) {
      return callback({ status: 'error', message: '從購物車中移除 coupon 失敗', content: err })
    }
  },

  checkTotalPrice: (cartId) => {
    try {
      return Cart.findOne({
        where: {
          id: cartId
        },
        include: [
          CartItem,
          { model: Product, as: "items" },
        ]
      }).then(cart => {

        if (cart) {
          // 計算總金額
          cart = cart || { items: [] }
          let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0

          // 計算折扣後的金額
          return CouponDistribution.findByPk(cart.CouponDistributionId).then(async result => {

            if (result) {
              Coupon.findByPk(result.CouponId).then(async coupon => {
                if (coupon.discount > 0 && coupon.amount > 0) {
                  // 同時使用百分比折扣與定額折扣
                  totalPrice = (totalPrice - coupon.amount) * (1 - coupon.discount / 100)
                  totalPrice = Math.ceil(totalPrice)
                } else if (coupon.discount > 0) {
                  // 使用百分比折扣
                  totalPrice = totalPrice * (1 - coupon.discount / 100)
                  totalPrice = Math.ceil(totalPrice)
                } else if (coupon.amount > 0) {
                  // 使用定額折扣
                  totalPrice = totalPrice - coupon.amount
                  totalPrice = Math.ceil(totalPrice)
                } else {
                  // 沒有折扣
                  totalPrice = Math.ceil(totalPrice)
                }

                // 加入 Admin 購物車折扣
                let adminDiscount = await Discount.findOne({ where: { dataStatus: 1 } })

                if (adminDiscount && (totalPrice >= adminDiscount.requireAmount)) {
                  totalPrice = Math.ceil(totalPrice * (1 - (adminDiscount.discountAmount / 100)))
                }

                await cart.update({
                  totalPrice: (totalPrice <= 0) ? 0 : totalPrice
                }).then(cart => {
                  console.log(`更新購物車（ID: ${cart.id}）總金額成功，總金額為 ${cart.totalPrice}`)
                }).catch(err => {
                  console.log(`更新購物車（ID: ${cart.id}）總金額失敗。Err: ${err}`)
                })
              }).catch(err => {
                return callback({ status: 'error', message: '取得 Coupon 資訊失敗' })
              })
            } else {
              totalPrice = Math.ceil(totalPrice)

              // 加入 Admin 購物車折扣
              let adminDiscount = await Discount.findOne({ where: { dataStatus: 1 } })

              if (adminDiscount && (totalPrice >= adminDiscount.requireAmount)) {
                totalPrice = Math.ceil(totalPrice * (1 - (adminDiscount.discountAmount / 100)))
              }

              cart.update({
                totalPrice: (totalPrice <= 0) ? 0 : totalPrice
              }).then(cart => {
                console.log(`更新購物車（ID: ${cart.id}）總金額成功，總金額為 ${cart.totalPrice}`)
              }).catch(err => {
                console.log(`更新購物車（ID: ${cart.id}）總金額失敗。Err: ${err}`)
              })
            }
          }).catch(err => {
            console.log(`更新購物車（ID: ${cart.id}）總金額失敗。Err: ${err}`)
          })
        } else {
          console.log(`更新購物車（ID: ${cart.id}）總金額失敗，購物車不存在。Err: ${err}`)
        }
      }).catch(err => {
        console.log(`更新購物車（ID: ${cart.id}）總金額失敗，購物車不存在。Err: ${err}`)
      })
    }
    catch (err) { console.log(`更新購物車（ID: ${cart.id}）總金額失敗，購物車不存在。Err: ${err}`) }
  }

}

module.exports = cartService