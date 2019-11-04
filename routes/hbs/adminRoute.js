const express = require('express')
const router = express.Router()

const userController = require('../../controllers/hbs/admin/userController')
const orderController = require('../../controllers/hbs/admin/orderController')

// User
router.get('/users', userController.editUsers)
router.put('/users/:user_id', userController.putUsers)

// Order
router.get('/orders', orderController.getOrders)
router.put('/orders/:order_id/cancel', orderController.cancelOrder)
router.put('/orders/:order_id/resume', orderController.resumeOrder)
router.put('/orders/:order_id/shipped', orderController.shippedOrder)
router.put('/orders/:order_id/unshipped', orderController.unshippedOrder)

module.exports = router