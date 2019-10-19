const db = require('../models')
const { Order, Cart, OrderItem, Product } = db
const moment = require('moment')

const orderService = {

  postOrder: (req, res, callback) => {

    try {
      // 利用時間產生序號 (sn) 並額外加入四位亂碼
      let nowTime = moment().format()
      nowTime = nowTime.replace(/-/g, "").replace(/:/g, "").split("+")
      let sn = '';
      for (let i = 0; i < nowTime[0].length; i++) {
        sn += '' + nowTime[0].charCodeAt(i).toString(16);
      }
      sn = Math.random().toString(36).slice(-4) + sn
      sn = sn.toUpperCase()

      return Cart.findOne({
        where: {
          Id: req.body.cart_id
        },
        include: [
          { model: Product, as: "items" }
        ]
      }).then(cart => {

        // 先建立訂單，取得 order.id
        let totalPrice = cart.totalPrice ? cart.totalPrice : 0
        return Order.create({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          sn: sn,
          totalAmount: totalPrice,
          UserId: req.user.id,
          shippingStatus: 0, // 待出貨 0, 已出貨 1, 取消出貨 2
          paymentStatus: 0,  // 待付款 0, 已付款 1, 取消付款 2
          dataStatus: 1,     // 訂單刪除 0, 訂單存在 1, 訂單取消 2
        }).then(order => {

          // 將 cart items 放入 order items
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
                OrderItem,
                { model: Product, as: "items" },
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
  },
}

module.exports = orderService