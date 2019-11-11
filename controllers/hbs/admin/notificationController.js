const notificationService = require('../../../services/admin/notificationService')

const notificationController = {

  getNotifications: (req, res) => {
    notificationService.getNotifications(req, res, (data) => {
      return res.render('admin/notifications', {
        content: data['content']
      })
    })
  },

}

module.exports = notificationController