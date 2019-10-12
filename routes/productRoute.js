const express = require('express')
const router = express.Router()

const adminProductController = require('../controllers/admin/productController')
const productController = require('../controllers/productController')

// Admin 操作
router.get('/', adminProductController.getProducts)
router.get('/:product_id', adminProductController.getProduct)

// 一般 User 操作
router.post('/:product_id/like', productController.likeProduct)
router.post('/:product_id/unlike', productController.unlikeProduct)

module.exports = router