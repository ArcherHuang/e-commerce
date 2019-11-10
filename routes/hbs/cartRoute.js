const express = require('express')
const router = express.Router()
const passport = require('passport')

const { ensureAuthenticated, isAuthUser, getUser } = require('../../config/auth')
const cartController = require('../../controllers/hbs/cartController')

router.get('/', cartController.getCart)
router.post('/', cartController.postCart)
router.post('/:cartItem_id/add', cartController.addCartItem)
router.post('/:cartItem_id/sub', cartController.subCartItem)
router.post('/:cartItem_id/delete', cartController.deleteCartItem)
router.post('/addCoupon', cartController.addCoupon)
router.post('/removeCoupon', cartController.removeCoupon)

module.exports = router