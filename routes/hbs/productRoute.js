const express = require('express')
const router = express.Router()
const passport = require('passport')

const { ensureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const productController = require('../../controllers/hbs/productController')


router.get('/main', productController.getProducts)
router.get('/shop', productController.getShop)
router.get('/:product_id', productController.getProduct)
router.post('/:product_id/unlike', productController.unlikeProduct)

module.exports = router