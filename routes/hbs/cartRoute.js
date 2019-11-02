const express = require('express')
const router = express.Router()
const passport = require('passport')

const { ensureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const cartController = require('../../controllers/hbs/cartController')

router.post('/', cartController.postCart)

module.exports = router