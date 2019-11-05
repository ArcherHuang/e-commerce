const userService = require('../../services/userService.js')

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

  checkEmail: (req, res, next) => {
    userService.checkEmail(req, res, (data) => {
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

  getCurrentUser: (req, res) => {
    userService.getCurrentUser(req, res, (data) => {
      return res.json(data)
    })
  },

  logout: (req, res) => {
    userService.logout(req, res, (data) => {
      return res.json(data)
    })
  },

  getFacebook: (req, res) => {
    userService.getFacebook(req, res, (data) => {
      return res.json(data)
    })
  },

  getFacebookCallback: (req, res) => {
    userService.getFacebookCallback(req, res, (data) => {
      return res.json(data)
    })
  },

  getViewHistory: (req, res) => {
    userService.getViewHistory(req, res, (data) => {
      return res.json(data)
    })
  },

  getUserReviews: (req, res) => {
    userService.getUserReviews(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = userController
