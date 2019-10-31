const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/api/cartController')
const { ensureAuthenticated, isAuthUser, getUser } = require('../../config/auth')

router.get('/', cartController.getCart)
router.post('/', cartController.postCart)
router.post('/:cartItem_id/add', cartController.addCartItem)
router.post('/:cartItem_id/sub', cartController.subCartItem)
router.post('/:cartItem_id/delete', cartController.deleteCartItem)
router.post('/addCoupon', ensureAuthenticated, getUser, isAuthUser, cartController.addCoupon)
router.post('/removeCoupon', ensureAuthenticated, getUser, isAuthUser, cartController.removeCoupon)


module.exports = router