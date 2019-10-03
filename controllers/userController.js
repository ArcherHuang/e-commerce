const userService = require('../services/userService.js')

const userController = {

  homePage: (req, res) => {
    return res.render('home')
  },

  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/')
  },

  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res, next) => {

    userService.signUp(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('/signup')
      } else if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        return next(null, data['user'])
        // res.redirect('/signin')
      }
    })

  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },



}

module.exports = userController
