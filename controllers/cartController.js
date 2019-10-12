const cartService = require('../services/cartService.js')

const cartController = {

  postCart: (req, res) => {
    cartService.postCart(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = cartController