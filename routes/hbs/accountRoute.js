const express = require('express')
const router = express.Router()
const passport = require('passport')

const { hbsEnsureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const accountController = require('../../controllers/hbs/accountController')

// User
router.get('/signin', accountController.signInView)
router.post('/signin', accountController.signIn)

router.get('/logout', accountController.logout)
router.get('/signup', accountController.signUpView)

module.exports = router