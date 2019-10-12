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
        console.log("===cart===")
        console.log(cart)
        cart = cart || { items: [] }
        let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0

        return callback({ status: 'success', message: '取得購物車資訊成功', cart: cart, totalPrice: totalPrice })
      })
    }
    catch (err) {
      console.log(err)
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

}

module.exports = cartService