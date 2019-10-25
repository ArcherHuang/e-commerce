const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isAuthUser, getUser } = require('../config/auth')
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:product_id', productController.getProduct)
router.post('/:product_id/like', ensureAuthenticated, getUser, isAuthUser, productController.likeProduct)
router.post('/:product_id/unlike', ensureAuthenticated, getUser, isAuthUser, productController.unlikeProduct)
router.post('/:product_id/reviews', ensureAuthenticated, getUser, isAuthUser, productController.postReview)
router.put('/:product_id/reviews/:review_id', ensureAuthenticated, getUser, isAuthUser, productController.putReview)

module.exports = router