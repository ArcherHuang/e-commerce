const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const adminUserController = require('../controllers/admin/userController')
const adminCategoryController = require('../controllers/admin/categoryController')
const adminCouponController = require('../controllers/admin/couponController')
const adminProductController = require('../controllers/admin/productController')

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

// Product
router.get('/products', adminProductController.getProducts)
router.get('/products/:product_id', adminProductController.getProduct)
router.post('/products', upload.single('image'), adminProductController.postProduct)
router.put('/products/:product_id', upload.single('image'), adminProductController.putProduct)
router.delete('/products/:product_id', adminProductController.deleteProduct)

module.exports = router