const db = require('../models')
const { Order, Cart, OrderItem, Product } = db

const orderService = {
  postOrder: (req, res, callback) => {
    try {
      return Cart.findOne({
        where: {
          Id: req.body.cart_id
        },
        include: [
          { model: Product, as: "items" }
        ]
      }).then(cart => {
        return Order.create({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          UserId: req.user.id
          // amount: 
          // shippingStatus: 
          // paymentStatus:
        }).then(order => {
          let results = []
          for (let i = 0; i < cart.items.length; i++) {
            results.push(
              OrderItem.create({
                OrderId: order.id,
                ProductId: cart.items[i].id,
                price: cart.items[i].price,
                quantity: cart.items[i].CartItem.quantity,
              })
            )
          }
          return Promise.all(results).then(() => {
            Order.findAll({
              where: {
                id: order.id,
              },
              include: [
                { model: Product, as: "items" }
              ]
            }).then(order => {
              return callback({ status: 'success', message: '建立訂單成功', content: order })
            }).catch(err => {
              return callback({ status: 'error', message: '建立訂單失敗' })
            })
          }
          ).catch(err => {
            return callback({ status: 'error', message: '建立訂單失敗' })
          })
        })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '建立訂單失敗' })
    }
  }
}

module.exports = orderService