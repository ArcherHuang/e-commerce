const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const orderController = require('../../controllers/hbs/orderController')

router.post('/', orderController.postOrder)
router.get('/:order_id/newebPayment', orderController.getNewebPayment)
router.get('/:order_id/stripePayment', orderController.getStripePayment)
router.post('/newebpay/callback', orderController.newebpayCallback)
router.get('/payment', (req, res) => res.render('paymentConfirm'))
router.post('/postStripePayment', orderController.postStripePayment)

module.exports = router