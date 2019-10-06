const express = require('express')
const router = express.Router()

const adminUserController = require('../controllers/admin/userController')
const adminCategoryController = require('../controllers/admin/categoryController')
const adminCouponController = require('../controllers/admin/couponController')

// User
router.get('/users', adminUserController.editUsers)
router.put('/users/:user_id', adminUserController.putUsers)

// 商品分類
router.post('/categories', adminCategoryController.postCategory)
router.put('/categories/:category_id', adminCategoryController.putCategory)
router.delete('/categories/:category_id', adminCategoryController.deleteCategory)
router.get('/categories', adminCategoryController.getCategories)
router.get('/categories/:category_id', adminCategoryController.getCategories)

// Coupon
router.post('/coupons', adminCouponController.postCoupon)
router.put('/coupons/:coupon_id', adminCouponController.putCoupon)
router.delete('/coupons/:coupon_id', adminCouponController.deleteCoupon)
router.get('/coupons', adminCouponController.getCoupons)
router.get('/coupons/:coupon_id', adminCouponController.getCoupons)

module.exports = router