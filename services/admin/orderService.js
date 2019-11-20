const db = require('../../models')
const { Order, User, Discount, Product } = db
const sendEmailService = require('../../services/sendEmailService')

const orderService = {

  getOrders: (req, res, callback) => {
    try {
      Order.findAll({
        order: [['updatedAt', 'DESC'], ['id', 'DESC']]
      }).then(orders => {
        if (req.params.order_id) {
          Order.findByPk(req.params.order_id, { include: [User, { model: Product, as: 'items' }] })
            .then((order) => {
              if (order) {
                return callback({ status: 'success', message: '取得特定 Order 資料', content: order, key: 'order' })
              } else {
                callback({ status: 'fail', message: '查無此 Order 存在' })
              }
            })
        } else {
          return callback({ status: 'success', message: '取得 Order 所有清單', content: orders, key: 'orders' })
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

  getDiscounts: async (req, res, callback) => {
    try {
      await Discount.findAll({
        order: [['dataStatus', 'DESC'], ['updatedAt', 'DESC']]
      }).then(discounts => {
        if (req.params.discount_id) {
          Discount.findByPk(req.params.discount_id)
            .then((discount) => {
              if (discount) {
                return callback({
                  status: 'success', message: '取得特定 Discount 資料',
                  content: discounts,
                  targetDiscount: discount,
                  key: 'discount'
                })
              } else {
                callback({ status: 'fail', message: '查無此 Discount 存在' })
              }
            })
        } else {
          return callback({ status: 'success', message: '取得 Discount 所有清單', content: discounts, key: 'discounts' })
        }
      })
    }
    catch (err) {
      return callback({ status: 'success', message: '取得 discount 資訊失敗', content: err })
    }
  },

  createDiscount: async (req, res, callback) => {
    try {
      const discountName = req.body.name.trim()
      const requireAmount = parseInt(req.body.requireAmount)
      const discountAmount = parseInt(req.body.discountAmount)

      // 檢查 discount name 不得為空值
      // 檢查 requireAmount 需大於等於零
      // 檢查 discountAmount 需介於大於 0 且小於 100
      if (discountName.length >= 1 && requireAmount > 0 && (discountAmount > 0 && discountAmount < 100)) {
        // 取消原有的 discount
        await Discount.findAll({
          where: {
            dataStatus: 1
          }
        }).then(async discounts => {
          for (let i = 0; i < discounts.length; i++) {
            await Discount.findByPk(discounts[i].id).then(async discount => {
              await discount.update({
                dataStatus: 0
              })
            })
          }
        })

        // 建立新的 discount
        await Discount.create({
          name: discountName,
          requireAmount: requireAmount,
          discountAmount: discountAmount,
          dataStatus: 1
        }).then(discount => {
          return callback({ status: 'success', message: '建立 discount 成功', content: discount })
        })

      } else {
        return callback({ status: 'error', message: '建立 discount 失敗，輸入資料有誤' })
      }
    }
    catch (err) {
      return callback({ status: 'error', message: '建立 discount 失敗', content: err })
    }
  },

  editDiscount: async (req, res, callback) => {
    try {
      const discountName = req.body.name.trim()
      const requireAmount = parseInt(req.body.requireAmount)
      const discountAmount = parseInt(req.body.discountAmount)

      // 檢查 discount name 不得為空值
      // 檢查 requireAmount 需大於等於零
      // 檢查 discountAmount 需介於大於 0 且小於 100
      if (discountName.length >= 1 && requireAmount > 0 && (discountAmount > 0 && discountAmount < 100)) {

        // 修改新的 discount
        await Discount.findOne({
          where: {
            id: req.params.discount_id,
            dataStatus: 1
          }
        }).then(async discount => {
          await discount.update({
            name: discountName,
            requireAmount: requireAmount,
            discountAmount: discountAmount,
            dataStatus: 1
          }).then(discount => {
            return callback({ status: 'success', message: '修改 discount 成功', content: discount })
          })
        })

      } else {
        return callback({ status: 'error', message: '修改 discount 失敗，輸入資料有誤' })
      }
    }
    catch (err) {
      return callback({ status: 'error', message: '修改 discount 失敗', content: err })
    }
  },

  cancelDiscount: async (req, res, callback) => {
    try {
      await Discount.findOne({
        where: {
          id: req.params.discount_id,
          dataStatus: 1
        }
      }).then(discount => {
        discount.update({
          dataStatus: 0
        }).then(() => {
          return callback({ status: 'success', message: '取消 discount 成功' })
        })
      }).catch(err => {
        return callback({ status: 'error', message: '取消 discount 失敗' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '取消 discount 失敗' })
    }
  },

}

module.exports = orderService  