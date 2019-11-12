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

  getOrder: (req, res) => {
    orderService.getOrders(req, res, (data) => {

      let products = data.content.items
      // 取出訂單中的商品數量
      products = products.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        price: r.price,
        quantity: r.OrderItem.quantity
      }))

      return res.render('admin/orderDetails', {
        [data['key']]: data['content'],
        products: products
      })
    })
  },

  cancelOrder: (req, res) => {
    orderService.cancelOrder(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, 'back', 'back')
    })
  },

  resumeOrder: (req, res) => {
    orderService.resumeOrder(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, 'back', 'back')
    })
  },

  shippedOrder: (req, res) => {
    orderService.shippedOrder(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, 'back', 'back')
    })
  },

  unshippedOrder: (req, res) => {
    orderService.unshippedOrder(req, res, (data) => {
      orderController.responseMessageAction(req, res, data, 'back', 'back')
    })
  },

  getDiscounts: (req, res) => {
    orderService.getDiscounts(req, res, (data) => {
      return res.render('admin/discounts', {
        discounts: data.content,
        targetDiscount: data.targetDiscount,
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