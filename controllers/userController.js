const userService = require('../services/userService.js')

const userController = {

  signIn: (req, res) => {
    userService.signIn(req, res, (data) => {
      return res.json(data)
    })
  },

  signUp: (req, res, next) => {
    userService.signUp(req, res, (data) => {
      return res.json(data)
    })
  },

  logout: (req, res) => {
    req.logout()
  },

}

module.exports = userController
