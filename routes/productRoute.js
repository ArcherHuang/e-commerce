const express = require('express')
const router = express.Router()

const adminProductController = require('../controllers/admin/productController')
const productController = require('../controllers/productController')

// Admin 操作
router.get('/products', adminProductController.getProducts)
router.get('/products/:product_id', adminProductController.getProduct)

// 一般 User 操作
router.post('/products/:product_id/like', productController.likeProduct)
router.post('/products/:product_id/unlike', productController.unlikeProduct)

module.exports = router