const userService = require('../../services/userService.js')

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

  signInView: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    userService.signIn(req, res, (data) => {
      userController.responseMessageAction(req, res, data, '/products', '/accounts/signin')
    })
  },

  signUpView: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res, next) => {
    userService.signUp(req, res, (data) => {
      userController.responseMessageAction(req, res, data, '/accounts/signin', '/accounts/signup')
    })
  },

  checkEmail: (req, res, next) => {
    userService.checkEmail(req, res, (data) => {
      userController.responseMessageAction(req, res, data, '/accounts/signin', '/accounts/signin')
    })
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },

}

module.exports = userController
