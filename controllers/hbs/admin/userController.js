const userService = require('../../../services/admin/userService')

const userController = {

  responseMessageAction: (req, res, data, successAction, errorAction) => {
    if (data['status'] === 'success') {
      req.flash('success_messages', data['message'])
      res.redirect(successAction)
    } else {
      req.flash('error_messages', data['message'])
      return res.redirect(errorAction)
    }
  },

  editUsers: (req, res) => {
    userService.editUsers(req, res, (data) => {
      console.log(`editUsers: ${JSON.stringify(data['content'])}`)
      return res.render('admin/users', {
        users: data['content']
      })
    })
  },

  putUsers: (req, res) => {
    userService.putUsers(req, res, (data) => {
      userController.responseMessageAction(req, res, data, '/admin/users', '/admin/users')
    })
  },

}

module.exports = userController