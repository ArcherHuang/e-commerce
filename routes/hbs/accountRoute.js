const express = require('express')
const router = express.Router()
const passport = require('passport')

const { hbsEnsureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const accountController = require('../../controllers/hbs/accountController')
const forgetPasswordController = require('../../controllers/hbs/forgetPasswordController')

// User
router.get('/signin', accountController.signInView)
router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true
}), accountController.signIn)

router.get('/logout', accountController.logout)
router.get('/signup', accountController.signUpView)
router.post('/signup', accountController.signUp)
router.get('/email-valid/:token', accountController.checkEmail)

router.get('/reset-password', forgetPasswordController.forgotPasswordView)
router.get('/reset-password/:token', forgetPasswordController.getRedisKey)
router.post('/reset-password', forgetPasswordController.setRedisKey)
router.get('/modfiy-password', forgetPasswordController.modifyPasswordView)
router.put('/modfiy-password', forgetPasswordController.resetPassword)

// Member
router.get('/', accountController.getProfile)
router.get('/edit', accountController.getProfileEditPage)
router.put('/', accountController.putProfile)
router.get('/orders', accountController.getOrders)
router.get('/orders/:order_id', accountController.getOrder)
router.put('/orders/:order_id/cancel', accountController.cancelOrder)
router.get('/coupons', accountController.getCoupons)

module.exports = router