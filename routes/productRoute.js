const express = require('express')
const router = express.Router()

const adminProductController = require('../controllers/admin/productController')

router.get('/products', adminProductController.getProducts)
router.get('/products/:product_id', adminProductController.getProduct)

module.exports = router