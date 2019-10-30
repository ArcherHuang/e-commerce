const orderService = require('../../services/orderService.js')

const orderController = {

  postOrder: (req, res) => {
    orderService.postOrder(req, res, (data) => {
      return res.json(data)
    })
  },

  getPayment: (req, res) => {
    orderService.getPayment(req, res, (data) => {
      return res.json(data)
    })
  },

  newebpayCallback: (req, res) => {
    orderService.newebpayCallback(req, res, (data) => {
      return res.json(data)
    })
  },

  postStripePayment: (req, res) => {
    orderService.postStripePayment(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = orderController