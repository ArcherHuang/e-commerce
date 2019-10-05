const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const forgetPasswordController = require('../controllers/forgetPasswordController')

// User
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.get('/logout', userController.logout)

// Reset Password
router.post('/reset-password', forgetPasswordController.setRedisKey)
router.get('/reset-password/:token', forgetPasswordController.getRedisKey)
router.put('/modfiy-password', forgetPasswordController.resetPassword)

module.exports = router