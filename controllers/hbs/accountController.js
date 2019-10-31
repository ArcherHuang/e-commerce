const userService = require('../../services/userService.js')

const userController = {

  signInView: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    userService.signIn(req, res, (data) => {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        console.log(`1_req_user_req_user_req_user_req_user: ${req.user}`)
        res.redirect('/products')
      } else {
        req.flash('error_messages', data['message'])
        return res.redirect('signin')
      }
    })
  },

  signUpView: (req, res) => {
    return res.render('signup')
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },

}

module.exports = userController
