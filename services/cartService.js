const validator = require('validator')
const db = require('../models')
const { Cart, CartItem, Product } = db

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
        cart = cart || { items: [] }
        let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0

        return callback({ status: 'success', message: '取得購物車資訊成功', cart: cart, totalPrice: totalPrice })
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

      if (product) {
        //若商品存在
        return Cart.findOrCreate({
          where: {
            id: req.session.cartId || 0
          },
        }).spread(function (cart, created) {
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
                return callback({ status: 'success', message: '商品加入購物車成功' })
              })
            }).catch(err => {
              return callback({ status: 'error', message: '商品加入購物車失敗' })
            })
          })
        }).catch(err => {
          return callback({ status: 'error', message: '商品加入購物車失敗' })
        })
      } else {
        //若商品不存在
        return callback({ status: 'error', message: '商品不存在，加入購物車失敗' })
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
        //檢查購物車中的商品數量，是否超過庫存  
        Product.findByPk(cartItem.ProductId).then(product => {
          if (cartItem.quantity >= product.inventory) {

            //若購物車中的商品數量大於等於商品庫存
            return callback({ status: 'error', message: '商品已無庫存' })
          } else {
            //若購物車中的商品數量小於商品庫存，可以持續增加數量
            cartItem.update({
              quantity: cartItem.quantity + 1,
            }).then((cartItem) => {
              return callback({ status: 'success', message: '新增商品數量成功' })
            }).catch(err => {
              return callback({ status: 'error', message: '新增商品數量失敗' })
            })
          }
        })
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
        if (cartItem) {
          if (cartItem.quantity > 1) {
            cartItem.update({
              quantity: cartItem.quantity - 1 >= 1 ? cartItem.quantity - 1 : 1
            }).then((cartItem) => {
              return callback({ status: 'success', message: '減少商品數量成功' })
            }).catch(err => {
              return callback({ status: 'error', message: '減少商品數量失敗' })
            })
          } else if (cartItem.quantity === 1) {
            return callback({ status: 'error', message: '商品數量為 1，無法繼續減少商品數量' })
          } else {
            return callback({ status: 'error', message: '減少商品數量失敗' })
          }
        } else {
          return callback({ status: 'error', message: 'cart item 不存在' })
        }
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '減少商品數量失敗' })
    }
  }
}

module.exports = cartService