const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isAuthAdmin, isAuthUser, getUser } = require('../config/auth')

const adminRoute = require('./api/adminRoute')
const accountRoute = require('./api/accountRoute')
const cartRoute = require('./api/cartRoute')
const productRoute = require('./api/productRoute')
const orderRoute = require('./api/orderRoute')
const authRoute = require('./api/authRoute')

// app.get('/', ensureAuthenticated, getUser, (req, res) => res.send('Hello World!'))
router.use('/admin', ensureAuthenticated, getUser, isAuthAdmin, adminRoute)
router.use('/accounts', getUser, accountRoute)
router.use('/carts', cartRoute)
router.use('/orders', orderRoute)
router.use('/products', productRoute)
router.use('/auth', authRoute)

module.exports = router
