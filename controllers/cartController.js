const cartService = require('../services/cartService.js')

const cartController = {

  getCart: (req, res) => {
    cartService.getCart(req, res, (data) => {
      return res.json(data)
    })
  },

  postCart: (req, res) => {
    cartService.postCart(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = cartController