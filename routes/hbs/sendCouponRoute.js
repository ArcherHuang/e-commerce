const express = require('express')
const router = express.Router()

const loginSendCouponController = require('../../controllers/hbs/admin/loginSendCouponController')

router.post('/coupon/users', loginSendCouponController.signInSendCoupon)

module.exports = router