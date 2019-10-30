const notificationService = require('../../../services/admin/notificationService')

const notificationController = {

  getNotifications: (req, res) => {
    notificationService.getNotifications(req, res, (data) => {
      return res.json(data)
    })
  },

}

module.exports = notificationController