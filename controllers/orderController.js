const orderService = require('../services/orderService.js')

const orderController = {

  postOrder: (req, res) => {
    orderService.postOrder(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = orderController