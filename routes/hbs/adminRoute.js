const express = require('express')
const router = express.Router()

const userController = require('../../controllers/hbs/admin/userController')
const couponController = require('../../controllers/hbs/admin/couponController')

// User
router.get('/users', userController.editUsers)
router.put('/users/:user_id', userController.putUsers)

// Coupon
router.get('/coupons', couponController.getCoupons)
router.post('/coupons', couponController.postCoupon)
router.get('/coupons/:coupon_id', couponController.getCoupons)
router.put('/coupons/:coupon_id', couponController.putCoupon)
router.delete('/coupons/:coupon_id', couponController.deleteCoupon)

module.exports = router