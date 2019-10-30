const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const accountController = require('../../controllers/api/accountController')
const forgetPasswordController = require('../../controllers/api/forgetPasswordController')

// Member
router.get('/', ensureAuthenticated, getUser, isAuthUser, accountController.getProfile)
router.put('/', ensureAuthenticated, getUser, isAuthUser, accountController.putProfile)
router.get('/coupons', ensureAuthenticated, getUser, isAuthUser, accountController.getCoupons)
router.get('/orders', ensureAuthenticated, getUser, isAuthUser, accountController.getOrders)
router.get('/orders/:order_id', ensureAuthenticated, getUser, isAuthUser, accountController.getOrder)
router.put('/orders/:order_id/cancel', ensureAuthenticated, getUser, isAuthUser, accountController.cancelOrder)
router.get('/history', ensureAuthenticated, getUser, isAuthUser, accountController.getViewHistory)

// User
router.post('/signin', accountController.signIn)
router.post('/signup', accountController.signUp)
router.get('/email-valid/:token', accountController.checkEmail)
router.get('/logout', accountController.logout)
router.get('/currentUser', ensureAuthenticated, getUser, isAuthUser, accountController.getCurrentUser)

// Reset Password
router.post('/reset-password', forgetPasswordController.setRedisKey)
router.get('/reset-password/:token', forgetPasswordController.getRedisKey)
router.put('/modify-password', forgetPasswordController.resetPassword)

module.exports = router