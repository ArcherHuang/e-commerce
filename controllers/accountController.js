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

  getProfile: (req, res) => {
    userService.getProfile(req, res, (data) => {
      return res.json(data)
    })
  },

  putProfile: (req, res) => {
    userService.putProfile(req, res, (data) => {
      return res.json(data)
    })
  },

  getOrders: (req, res) => {
    userService.getOrders(req, res, (data) => {
      return res.json(data)
    })
  },

  getOrder: (req, res) => {
    userService.getOrder(req, res, (data) => {
      return res.json(data)
    })
  },

  cancelOrder: (req, res) => {
    userService.cancelOrder(req, res, (data) => {
      return res.json(data)
    })
  },

  getCoupons: (req, res) => {
    userService.getCoupons(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = userController
