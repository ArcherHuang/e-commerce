const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const { ensureAuthenticated, isAuthAdmin, getUser, authenticatedAdmin } = require('../config/auth')

const accountRoute = require('./hbs/accountRoute')
const cartRoute = require('./hbs/cartRoute')
const orderRoute = require('./hbs/orderRoute')
const productRoute = require('./hbs/productRoute')
const adminRoute = require('./hbs/adminRoute')
const sendCouponRoute = require('./hbs/sendCouponRoute')
const authRoute = require('./hbs/authRoute')

router.use('/accounts', accountRoute)
router.use('/carts', cartRoute)
router.use('/orders', orderRoute)
router.use('/products', productRoute)
router.use('/admin', authenticatedAdmin, adminRoute)
router.use('/send', sendCouponRoute)
router.use('/auth', authRoute)

// 將其他 routes 導回首頁
router.get('/', (req, res) => res.redirect('/products/main'))
router.get('*', (req, res) => res.redirect('/products/main'))

module.exports = router

