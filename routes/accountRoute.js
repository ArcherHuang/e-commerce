const express = require('express')
const router = express.Router()

const accountController = require('../controllers/accountController')
const forgetPasswordController = require('../controllers/forgetPasswordController')

// Member
router.get('/', accountController.getProfile)
router.put('/', accountController.putProfile)
router.get('/coupons', accountController.getCoupons)
router.get('/orders', accountController.getOrders)
router.get('/orders/:order_id', accountController.getOrder)
router.put('/orders/:order_id/cancel', accountController.cancelOrder)

// User
router.post('/signin', accountController.signIn)
router.post('/signup', accountController.signUp)
router.get('/logout', accountController.logout)
router.get('/currentUser', accountController.getCurrentUser)

// Reset Password
router.post('/reset-password', forgetPasswordController.setRedisKey)
router.get('/reset-password/:token', forgetPasswordController.getRedisKey)
router.put('/modify-password', forgetPasswordController.resetPassword)

module.exports = router