const orderService = require('../../../services/admin/orderService')

const orderController = {

  responseMessageAction: (req, res, data, successAction, errorAction) => {
    try {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        res.redirect(successAction)
      } else {
        req.flash('error_messages', data['message'])
        return res.redirect(errorAction)
      }
    }
    catch (err) {
      console.log(`Err: ${err}`)
      req.flash('error_messages', "Order 功能操作失敗")
      res.redirect('back')
    }
  },

  getOrders: (req, res) => {
    orderService.getOrders(req, res, (data) => {
      return res.render('admin/orders', {
        [data['key']]: data['content']
      })
    })
  },

  cancelOrder: (req, res) => {
    orderService.cancelOrder(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, '/admin/orders', 'back')
    })
  },

  resumeOrder: (req, res) => {
    orderService.resumeOrder(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, '/admin/orders', 'back')
    })
  },

  shippedOrder: (req, res) => {
    orderService.shippedOrder(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, '/admin/orders', 'back')
    })
  },

  unshippedOrder: (req, res) => {
    orderService.unshippedOrder(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, '/admin/orders', 'back')
    })
  },

  getDiscounts: (req, res) => {
    orderService.getDiscounts(req, res, (data) => {
      return res.render('admin/discounts', {
        [data['key']]: data['content']
      })
    })
  },

  createDiscount: (req, res) => {
    orderService.createDiscount(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, '/admin/orders/discounts', 'back')
    })
  },

  editDiscount: (req, res) => {
    orderService.editDiscount(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, '/admin/orders/discounts', 'back')
    })
  },

  cancelDiscount: (req, res) => {
    orderService.cancelDiscount(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, '/admin/orders/discounts', '/admin/orders/discounts')
    })
  },

}

module.exports = orderController