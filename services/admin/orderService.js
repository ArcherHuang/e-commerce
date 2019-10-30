const db = require('../../models')
const { Order, User, Discount } = db
const sendEmailService = require('../../services/sendEmailService')

const orderService = {

  getOrders: (req, res, callback) => {
    try {
      Order.findAll().then(orders => {
        if (req.params.order_id) {
          Order.findByPk(req.params.order_id)
            .then((order) => {
              if (order) {
                return callback({ status: 'success', message: '取得特定 Order 資料', content: order })
              } else {
                callback({ status: 'fail', message: '查無此 Order 存在' })
              }
            })
        } else {
          return callback({ status: 'success', message: '取得 Order 所有清單', content: orders })
        }
      })
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: error })
    }
  },

  // 訂單刪除 dataStatus = 0
  // 訂單存在 dataStatus = 1
  // 訂單取消 dataStatus = 2

  // 訂單取消：1 變 2
  cancelOrder: async (req, res, callback) => {
    try {
      Order.findOne({
        where: {
          id: req.params.order_id,
          dataStatus: 1
        }
      })
        .then((order) => {
          if (order) {
            order.update({
              dataStatus: 2
            })
              .then(async (order) => {

                // 發送訂單取消通知信件
                let user = await User.findByPk(order.UserId)
                let email = user.email
                let subject = `AJA Online Store: 訂單已取消（編號: ${order.sn}）`
                let type = 'text'
                let info = `您的訂單已被取消（編號: ${order.sn}），請洽服務人員了解詳情，謝謝`
                sendEmailService.mailInfo({ email, subject, type, info })

                callback({ status: 'success', message: 'Order 已取消訂單成功' })
              })
          } else {
            callback({ status: 'fail', message: '查無此 Order 存在' })
          }
        })
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: error })
    }
  },

  // 訂單恢復：2 變 1
  resumeOrder: async (req, res, callback) => {
    try {
      Order.findOne({
        where: {
          id: req.params.order_id,
          dataStatus: 2
        }
      }).then((order) => {
        if (order) {
          order.update({
            dataStatus: 1
          })
            .then(async (order) => {

              // 發送訂單恢復通知信件
              let user = await User.findByPk(order.UserId)
              let email = user.email
              let subject = `AJA Online Store: 訂單已恢復（編號: ${order.sn}）`
              let type = 'text'
              let info = `您的訂單已恢復（編號: ${order.sn}），若有其他問題，請洽服務人員，謝謝`
              sendEmailService.mailInfo({ email, subject, type, info })

              callback({ status: 'success', message: 'Order 已恢復訂單成功' })
            })
        } else {
          callback({ status: 'fail', message: '查無此 Order 存在' })
        }
      })
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: error })
    }
  },

  // 出貨 shippingStatus = 1
  shippedOrder: async (req, res, callback) => {
    try {
      Order.findByPk(req.params.order_id)
        .then((order) => {
          if (order) {
            order.update({
              shippingStatus: 1
            })
              .then(async (order) => {

                // 發送訂單出貨通知信件
                let user = await User.findByPk(order.UserId)
                let email = user.email
                let subject = `AJA Online Store: 訂單已出貨（編號: ${order.sn}）`
                let type = 'text'
                let info = `您的訂單已出貨（編號: ${order.sn}）！`
                sendEmailService.mailInfo({ email, subject, type, info })

                callback({ status: 'success', message: 'Order 已出貨成功' })
              })
          } else {
            callback({ status: 'fail', message: '查無此 Order 存在' })
          }
        })
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: error })
    }
  },

  // 取消出貨 shippingStatus = 2
  unshippedOrder: async (req, res, callback) => {
    try {
      Order.findByPk(req.params.order_id)
        .then((order) => {
          if (order) {
            order.update({
              shippingStatus: 2
            })
              .then(async (order) => {

                // 發送訂單出貨取消通知信件
                let user = await User.findByPk(order.UserId)
                let email = user.email
                let subject = `AJA Online Store: 訂單已取消出貨（編號: ${order.sn}）`
                let type = 'text'
                let info = `您的訂單已取消出貨（編號: ${order.sn}），請洽服務人員了解詳情，謝謝！`
                sendEmailService.mailInfo({ email, subject, type, info })

                callback({ status: 'success', message: 'Order 已取消出貨成功' })
              })
          } else {
            callback({ status: 'fail', message: '查無此 Order 存在' })
          }
        })
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: error })
    }
  },

  // 待出貨 shippingStatus = 0

  getDiscounts: async (req, res, callback) => {
    try {
      await Discount.findAll().then(discounts => {
        return callback({ status: 'success', message: '取得 discount 資訊成功', content: discounts })
      })
    }
    catch (err) {
      return callback({ status: 'success', message: '取得 discount 資訊失敗', content: err })
    }
  }
}

module.exports = orderService  