const forgotPasswordService = require('../services/forgotPasswordService.js')

const forgetPasswordController = {

  forgotPasswordPage: (req, res) => {
    return res.render('forgotPassword')
  },

  modifyPasswordPage: (req, res) => {
    return res.render('modifyPassword')
  },

  setRedisKey: (req, res) => {

    forgotPasswordService.setRedisKey(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
      } else if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
      }
      res.redirect('/reset-password')
    })

  },

  getRedisKey: (req, res) => {

    forgotPasswordService.getRedisKey(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        res.redirect('/reset-password')
      } else if (data['status'] === 'success') {
        res.redirect('/modfiy-password')
      }
    })

  },

  resetPassword: (req, res) => {

    forgotPasswordService.resetPassword(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        res.redirect('/modfiy-password')
      } else if (data['status'] === 'success') {
        req.flash('success', data['message'])
        res.redirect('/signin')
      }
    })

  },

}

module.exports = forgetPasswordController