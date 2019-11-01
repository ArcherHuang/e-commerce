const forgotPasswordService = require('../../services/forgotPasswordService.js')

const forgetPasswordController = {

  responseMessageAction: (req, res, data, successAction, errorAction) => {
    if (data['status'] === 'success') {
      req.flash('success_messages', data['message'])
      res.redirect(successAction)
    } else {
      req.flash('error_messages', data['message'])
      return res.redirect(errorAction)
    }
  },

  forgotPasswordView: (req, res) => {
    return res.render('forgotPassword')
  },

  modifyPasswordView: (req, res) => {
    return res.render('modifyPassword')
  },

  setRedisKey: (req, res) => {
    forgotPasswordService.setRedisKey(req, res, (data) => {
      forgetPasswordController.responseMessageAction(req, res, data, '/accounts/reset-password', '/accounts/reset-password')
    })
  },

  getRedisKey: (req, res) => {
    forgotPasswordService.getRedisKey(req, res, (data) => {
      forgetPasswordController.responseMessageAction(req, res, data, '/accounts/modfiy-password', '/accounts/reset-password')
    })
  },

  resetPassword: (req, res) => {
    forgotPasswordService.resetPassword(req, res, (data) => {
      forgetPasswordController.responseMessageAction(req, res, data, '/accounts/signin', '/accounts/modfiy-password')
    })
  },

}

module.exports = forgetPasswordController