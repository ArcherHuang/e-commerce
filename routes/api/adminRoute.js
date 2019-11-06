const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const adminUserController = require('../../controllers/api/admin/userController')
const adminCategoryController = require('../../controllers/api/admin/categoryController')
const adminCouponController = require('../../controllers/api/admin/couponController')
const adminProductController = require('../../controllers/api/admin/productController')
const adminOrderController = require('../../controllers/api/admin/orderController')
const adminNotificationController = require('../../controllers/api/admin/notificationController')


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
router.get('/coupons/history', adminCouponController.getCouponHistory)
router.get('/coupons/:coupon_id', adminCouponController.getCoupons)
router.post('/coupons/:coupon_id/send', adminCouponController.sendCoupon)


// Product
router.get('/products', adminProductController.getProducts)
router.get('/products/:product_id', adminProductController.getProduct)
router.post('/products', upload.single('image'), adminProductController.postProduct)
router.put('/products/:product_id', upload.single('image'), adminProductController.putProduct)
router.delete('/products/:product_id', adminProductController.deleteProduct)

// Order
router.get('/orders', adminOrderController.getOrders)
router.get('/orders/discounts', adminOrderController.getDiscounts)
router.get('/orders/discounts/:discount_id', adminOrderController.getDiscounts)
router.post('/orders/discounts', adminOrderController.createDiscount)
router.put('/orders/discounts/:discount_id/edit', adminOrderController.editDiscount)
router.put('/orders/discounts/:discount_id/cancel', adminOrderController.cancelDiscount)
router.get('/orders/:order_id', adminOrderController.getOrders)
router.put('/orders/:order_id/cancel', adminOrderController.cancelOrder)
router.put('/orders/:order_id/resume', adminOrderController.resumeOrder)
router.put('/orders/:order_id/shipped', adminOrderController.shippedOrder)
router.put('/orders/:order_id/unshipped', adminOrderController.unshippedOrder)

// Notification
router.get('/notifications', adminNotificationController.getNotifications)

module.exports = router