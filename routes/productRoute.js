const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:product_id', productController.getProduct)
router.post('/:product_id/like', productController.likeProduct)
router.post('/:product_id/unlike', productController.unlikeProduct)

module.exports = router