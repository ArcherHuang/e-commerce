const adminCouponService = require('../services/adminCouponService.js')

const adminCouponController = {

  returnResult: (req, res, data) => {
    if (data['status'] === 'error') {
      req.flash('error_messages', data['message'])
    } else if (data['status'] === 'success') {
      req.flash('success_messages', data['message'])
    }
    return res.json(data)
  },

  postCoupon: (req, res, callback) => {
    adminCouponService.postCoupon(req, res, (data) => {
      adminCouponController.returnResult(req, res, data)
    })
  },

  putCoupon: (req, res, callback) => {
    adminCouponService.putCoupon(req, res, (data) => {
      adminCouponController.returnResult(req, res, data)
    })
  },

  deleteCoupon: (req, res, callback) => {
    adminCouponService.deleteCoupon(req, res, (data) => {
      adminCouponController.returnResult(req, res, data)
    })
  },

  getCoupons: (req, res, callback) => {
    adminCouponService.getCoupons(req, res, (data) => {
      adminCouponController.returnResult(req, res, data)
    })
  },

}

module.exports = adminCouponController