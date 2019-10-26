const validator = require('validator')
const db = require('../models')
const { Cart, CartItem, Coupon, CouponDistribution, Product } = db

const cartService = {

  getCart: (req, res, callback) => {
    try {
      return Cart.findOne({
        where: {
          id: req.session.cartId
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
          return CouponDistribution.findByPk(cart.CouponDistributionId).then(result => {

            if (result) {
              Coupon.findByPk(result.CouponId).then(coupon => {
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

                cart.update({
                  totalPrice: totalPrice
                }).then(cart => {
                  return callback({ status: 'success', message: '取得購物車資訊成功', cart: cart })
                }).catch(err => {
                  return callback({ status: 'error', message: '取得購物車資訊失敗' })
                })

              }).catch(err => {
                return callback({ status: 'error', message: '取得 Coupon 資訊失敗' })
              })
            } else {
              totalPrice = Math.ceil(totalPrice)
              cart.update({
                totalPrice: totalPrice
              }).then(cart => {
                return callback({ status: 'success', message: '取得購物車資訊成功', cart: cart })
              }).catch(err => {
                return callback({ status: 'error', message: '取得購物車資訊失敗' })
              })
            }
          }).catch(err => {
            return callback({ status: 'error', message: '取得 Coupon Distribution 資訊失敗' })
          })
        } else {
          return callback({ status: 'error', message: '取得購物車資訊失敗，購物車不存在' })
        }
      }).catch(err => {
        return callback({ status: 'error', message: '取得購物車資訊失敗' })
      })
    }
    catch (err) {
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
        return Cart.findOrCreate({
          where: {
            id: req.session.cartId || 0
          },
        }).spread(function (cart, created) {

          // 將商品加入購物車
          return CartItem.findOrCreate({
            where: {
              CartId: cart.id,
              ProductId: req.body.productId
            },
            default: {
              CartId: cart.id,
              ProductId: req.body.productId
            }
          }).spread(function (cartItem, created) {
            return cartItem.update({
              quantity: (cartItem.quantity || 0) + 1
            }).then(cartItem => {
              req.session.cartId = cart.id
              return req.session.save(() => {

                //商品庫存減一
                Product.findByPk(req.body.productId).then(product => {
                  product.update({
                    inventory: product.inventory - 1
                  }).then(product => {
                    return callback({ status: 'success', message: '商品加入購物車成功' })
                  }).catch(err => {
                    return callback({ status: 'err', message: '降低存貨失敗', content: err })
                  })
                }).catch(err => {
                  return callback({ status: 'err', message: '找不到商品', content: err })
                })
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
                    return callback({ status: 'success', message: '新增商品數量成功' })
                  }).catch(err => {
                    return callback({ status: 'err', message: '降低存貨失敗', content: err })
                  })
                }).catch(err => {
                  return callback({ status: 'err', message: '找不到商品', content: err })
                })
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

  addCoupon: (req, res, callback) => {
    try {
      // 確認 coupon 是否存在
      return Coupon.findOne({
        where: {
          sn: req.body.coupon_code,
          dataStatus: 1
        }
      }).then(coupon => {

        // 確認使用者是否擁有該 coupon，且 coupon 未被使用
        return CouponDistribution.findOne({
          where: {
            CouponId: coupon.id,
            UserId: req.user.id,
            usageStatus: "1"  // unused 1, used 2, expired 3, deleted 0
          }
        }).then(result => {
          // 將有效 coupon 加入 cart
          return Cart.findOne({
            where: {
              id: req.session.cartId
            },
          }).then(cart => {
            cart.update({
              CouponDistributionId: result.id
            }).then(() => {
              return callback({ status: 'success', message: '使用 coupon 成功' })
            }).catch(err => {
              return callback({ status: 'error', message: '使用 coupon 失敗' })
            })
          }).catch(err => {
            return callback({ status: 'error', message: '購物車不存在' })
          })
        })
      }).catch(err => {
        return callback({ status: 'error', message: '使用者無法使用該 coupon' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: 'Coupon 不存在' })
    }
  },

  removeCoupon: (req, res, callback) => {
    try {
      return Cart.findOne({
        where: {
          id: req.session.cartId
        },
      }).then(cart => {
        return cart.update({
          CouponDistributionId: null
        }).then(cart => {
          return callback({ status: 'success', message: '從購物車中移除 coupon 成功' })
        }).catch(err => {
          return callback({ status: 'error', message: '從購物車中移除 coupon 失敗' })
        })
      }).catch(err => {
        return callback({ status: 'error', message: '購物車中不存在' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '從購物車中移除 coupon 失敗' })
    }
  },

}

module.exports = cartService