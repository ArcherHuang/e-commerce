const db = require('../../models')
const { Notification } = db

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

}

module.exports = notificationService 