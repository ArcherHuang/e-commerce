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
        // 先建立訂單，取得 order.id
        return Order.create({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          UserId: req.user.id,
          totalAmount: 0,
          shippingStatus: 0, // 待出貨 0, 已出貨 1, 取消出貨 2
          paymentStatus: 0,  // 待付款 0, 已付款 1, 取消付款 2
          dataStatus: 1,     // 訂單刪除 0, 訂單存在 1, 訂單取消 2
        }).then(order => {

          // 將 cart items 放入 order items，並計算總金額
          let results = []
          let totalAmount = 0
          for (let i = 0; i < cart.items.length; i++) {
            results.push(
              OrderItem.create({
                OrderId: order.id,
                ProductId: cart.items[i].id,
                price: cart.items[i].price,
                quantity: cart.items[i].CartItem.quantity,
              })
            )
            totalAmount = totalAmount + (cart.items[i].price * cart.items[i].CartItem.quantity)
          }

          return Promise.all(results).then(() => {
            Order.findAll({
              where: {
                id: order.id,
              },
              include: [
                OrderItem,
                { model: Product, as: "items" },
              ]
            }).then(order => {
              // 更新訂單的總金額
              order[0].update({
                totalAmount: totalAmount
              }).then(order => {
                return callback({ status: 'success', message: '建立訂單成功', content: order })
              }).catch(err => {
                return callback({ status: 'error', message: '建立訂單失敗' })
              })
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
  },
}

module.exports = orderService