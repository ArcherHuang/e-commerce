const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isAuthAdmin, isAuthUser, getUser } = require('../config/auth')
const orderController = require('../controllers/orderController')

router.post('/', ensureAuthenticated, getUser, isAuthUser, orderController.postOrder)
router.get('/:order_id/payment', ensureAuthenticated, getUser, isAuthUser, orderController.getPayment)
router.post('/newebpay/callback', orderController.newebpayCallback)
router.post('/postStripePayment', orderController.postStripePayment)

module.exports = router