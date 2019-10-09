const db = require('../../models')
const Order = db.Order

const orderService = {

  getOrders: (req, res, callback) => {
    Order.findAll().then(orders => {

      if (req.params.order_id) {
        Order.findByPk(req.params.order_id)
          .then((order) => {
            return callback({ status: 'success', message: '取得特定 Order 資料', content: order })
          })
      } else {
        return callback({ status: 'success', message: '取得 Order 所有清單', content: orders })
      }

    })
  },

  // 訂單刪除 dataStatus = 0
  // 訂單存在 dataStatus = 1
  // 訂單取消 dataStatus = 2

  // 訂單取消：1 變 2
  cancelOrder: (req, res, callback) => {
    Order.findByPk(req.params.order_id)
      .then((order) => {
        if (order) {
          order.update({
            dataStatus: 2
          })
            .then((order) => {
              callback({ status: 'success', message: 'Order 已取消訂單成功' })
            })
        } else {
          callback({ status: 'fail', message: '查無此 Order 存在' })
        }
      })
  },

  // 訂單恢復：2 變 1
  resumeOrder: (req, res, callback) => {
    Order.findByPk(req.params.order_id)
      .then((order) => {
        if (order) {
          order.update({
            dataStatus: 1
          })
            .then((order) => {
              callback({ status: 'success', message: 'Order 已恢復訂單成功' })
            })
        } else {
          callback({ status: 'fail', message: '查無此 Order 存在' })
        }
      })
  },

  // 出貨 shippingStatus = 1
  shippedOrder: (req, res, callback) => {
    Order.findByPk(req.params.order_id)
      .then((order) => {
        if (order) {
          order.update({
            shippingStatus: 1
          })
            .then((order) => {
              callback({ status: 'success', message: 'Order 已出貨成功' })
            })
        } else {
          callback({ status: 'fail', message: '查無此 Order 存在' })
        }
      })
  },

  // 取消出貨 shippingStatus = 2
  unshippedOrder: (req, res, callback) => {
    Order.findByPk(req.params.order_id)
      .then((order) => {
        if (order) {
          order.update({
            shippingStatus: 2
          })
            .then((order) => {
              callback({ status: 'success', message: 'Order 已取消出貨成功' })
            })
        } else {
          callback({ status: 'fail', message: '查無此 Order 存在' })
        }
      })
  },

  // 待出貨 shippingStatus = 0

}

module.exports = orderService  