const orderService = require('../../services/admin/orderService')

let orderController = {

  getOrders: (req, res, callback) => {
    orderService.getOrders(req, res, (data) => {
      return res.json(data)
    })
  },

  cancelOrder: (req, res, callback) => {
    orderService.cancelOrder(req, res, (data) => {
      return res.json(data)
    })
  },

  resumeOrder: (req, res, callback) => {
    orderService.resumeOrder(req, res, (data) => {
      return res.json(data)
    })
  },

  shippedOrder: (req, res, callback) => {
    orderService.shippedOrder(req, res, (data) => {
      return res.json(data)
    })
  },

  unshippedOrder: (req, res, callback) => {
    orderService.unshippedOrder(req, res, (data) => {
      return res.json(data)
    })
  },

  getDiscounts: (req, res, callback) => {
    orderService.getDiscounts(req, res, (data) => {
      return res.json(data)
    })
  },

  createDiscount: (req, res, callback) => {
    orderService.createDiscount(req, res, (data) => {
      return res.json(data)
    })
  },

  editDiscount: (req, res, callback) => {
    orderService.editDiscount(req, res, (data) => {
      return res.json(data)
    })
  },

  cancelDiscount: (req, res, callback) => {
    orderService.cancelDiscount(req, res, (data) => {
      return res.json(data)
    })
  }

}

module.exports = orderController