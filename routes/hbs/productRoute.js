const express = require('express')
const router = express.Router()
const passport = require('passport')

const { ensureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const productController = require('../../controllers/hbs/productController')

router.get('/', productController.getProducts)
router.get('/shop', productController.getShop)

module.exports = router