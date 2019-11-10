const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const userController = require('../../controllers/hbs/admin/userController')
const orderController = require('../../controllers/hbs/admin/orderController')
const categoryController = require('../../controllers/hbs/admin/categoryController')
const couponController = require('../../controllers/hbs/admin/couponController')
const productController = require('../../controllers/hbs/admin/productController')

// User
router.get('/users', userController.editUsers)
router.put('/users/:user_id', userController.putUsers)

// Discount
router.get('/orders/discounts', orderController.getDiscounts)
router.get('/orders/discounts/:discount_id', orderController.getDiscounts)
router.post('/orders/discounts', orderController.createDiscount)
router.put('/orders/discounts/:discount_id/edit', orderController.editDiscount)
router.put('/orders/discounts/:discount_id/cancel', orderController.cancelDiscount)

// Order
router.get('/orders', orderController.getOrders)
router.get('/orders/:order_id', orderController.getOrder)
router.put('/orders/:order_id/cancel', orderController.cancelOrder)
router.put('/orders/:order_id/resume', orderController.resumeOrder)
router.put('/orders/:order_id/shipped', orderController.shippedOrder)
router.put('/orders/:order_id/unshipped', orderController.unshippedOrder)

// Category
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategory)
router.get('/categories/:category_id', categoryController.getCategories)
router.get('/categories/:category_id/edit', categoryController.getCategoryEditPage)
router.put('/categories/:category_id', categoryController.putCategory)
router.delete('/categories/:category_id', categoryController.deleteCategory)

// Coupon
router.get('/coupons', couponController.getCoupons)
router.post('/coupons', couponController.postCoupon)
router.get('/coupons/:coupon_id', couponController.getCoupons)
router.put('/coupons/:coupon_id', couponController.putCoupon)
router.delete('/coupons/:coupon_id', couponController.deleteCoupon)
router.get('/send/coupon/users', userController.listUsers)

// Product
router.get('/products', productController.getProducts)
router.get('/products/create', productController.getProductEditPage)
router.get('/products/:product_id', productController.getProduct)
router.get('/products/:product_id/edit', productController.getProductEditPage)
router.post('/products', upload.single('image'), productController.postProduct)
router.put('/products/:product_id', upload.single('image'), productController.putProduct)
router.delete('/products/:product_id', productController.deleteProduct)

module.exports = router