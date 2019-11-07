const express = require('express')
const router = express.Router()
const passport = require('passport')

const { ensureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const productController = require('../../controllers/hbs/productController')


router.get('/main', productController.getProducts)
router.get('/shop', productController.getShop)
router.get('/:product_id', productController.getProduct)
router.post('/:product_id/unlike', productController.unlikeProduct)
router.post('/:product_id/reviews', productController.postReview)
router.delete('/:product_id/reviews/:review_id', productController.deleteReview)
router.get('/:product_id/reviews/:review_id/edit', productController.getReviewEditPage)
router.put('/:product_id/reviews/:review_id', productController.putReview)

module.exports = router