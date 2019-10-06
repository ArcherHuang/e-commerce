const adminService = require('../../services/admin/userService')

const userController = {

  editUsers: (req, res) => {
    adminService.editUsers(req, res, (data) => {
      return res.json(data)
    })
  },

  putUsers: (req, res) => {
    adminService.putUsers(req, res, (data) => {
      return res.json(data)
    })
  }

}

module.exports = userController