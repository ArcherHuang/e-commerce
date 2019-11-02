const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const { ensureAuthenticated, isAuthAdmin, getUser } = require('../config/auth')

const accountRoute = require('./hbs/accountRoute')
const cartRoute = require('./hbs/cartRoute')
const productRoute = require('./hbs/productRoute')

router.use('/', productRoute)
router.use('/accounts', accountRoute)
router.use('/carts', cartRoute)
router.use('/products', productRoute)

module.exports = router

