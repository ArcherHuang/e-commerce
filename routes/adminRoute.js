const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')
const categoryController = require('../controllers/categoryController')
const adminCouponController = require('../controllers/adminCouponController')

// User
router.get('/users', adminController.editUsers)
router.put('/users/:user_id', adminController.putUsers)

// 商品分類
router.post('/categories', categoryController.postCategory)
router.put('/categories/:category_id', categoryController.putCategory)
router.delete('/categories/:category_id', categoryController.deleteCategory)
router.get('/categories', categoryController.getCategories)
router.get('/categories/:category_id', categoryController.getCategories)

// Coupon
router.post('/coupons', adminCouponController.postCoupon)
router.put('/coupons/:coupon_id', adminCouponController.putCoupon)
router.delete('/coupons/:coupon_id', adminCouponController.deleteCoupon)
router.get('/coupons', adminCouponController.getCoupons)
router.get('/coupons/:coupon_id', adminCouponController.getCoupons)

module.exports = router