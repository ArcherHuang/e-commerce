const db = require('../../models')
const { Notification, Product } = db

const notificationService = {

  getNotifications: (req, res, callback) => {
    try {
      Notification.findAll({
        order: [['updatedAt', 'DESC']]
      }).then(notifications => {
        return callback({ status: 'success', message: '取得 notifications 成功', content: notifications })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '取得 notifications 失敗' })
    }
  },

  checkInventory: async (productId) => {
    try {
      let product = await Product.findByPk(productId)

      // 若商品存在，且數量小於 10
      if (product && product.inventory === 0) {
        Notification.create({
          type: "warning",            // warning 警告訊息
          category: "Inventory",
          content: `Product (ID: ${productId}) 已無庫存`,
          dataStatus: 1
        })
      } else if (product && product.inventory < 10) {
        Notification.create({
          type: "warning",            // warning 警告訊息
          category: "Inventory",
          content: `Product (ID: ${productId}) 庫存過低，僅剩 ${product.inventory}`,
          dataStatus: 1
        })
      }
    }
    catch (err) {
      console.log(`checkInventory 失敗，Err: ${err}`)
    }
  }
}

module.exports = notificationService 