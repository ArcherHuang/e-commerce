const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isAuthUser, getUser } = require('../config/auth')
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:product_id', productController.getProduct)
router.post('/:product_id/like', ensureAuthenticated, getUser, isAuthUser, productController.likeProduct)
router.post('/:product_id/unlike', ensureAuthenticated, getUser, isAuthUser, productController.unlikeProduct)

module.exports = router