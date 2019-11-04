const express = require('express')
const router = express.Router()

const userController = require('../../controllers/hbs/admin/userController')
const categoryController = require('../../controllers/hbs/admin/categoryController')
const couponController = require('../../controllers/hbs/admin/couponController')

// User
router.get('/users', userController.editUsers)
router.put('/users/:user_id', userController.putUsers)

// Category
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategory)
router.get('/categories/:category_id', categoryController.getCategories)
router.put('/categories/:category_id', categoryController.putCategory)
router.delete('/categories/:category_id', categoryController.deleteCategory)

// Coupon
router.get('/coupons', couponController.getCoupons)
router.post('/coupons', couponController.postCoupon)
router.get('/coupons/:coupon_id', couponController.getCoupons)
router.put('/coupons/:coupon_id', couponController.putCoupon)
router.delete('/coupons/:coupon_id', couponController.deleteCoupon)

module.exports = router