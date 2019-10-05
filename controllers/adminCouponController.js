const adminCouponService = require('../services/adminCouponService.js')

const adminCouponController = {

  postCoupon: (req, res, callback) => {
    adminCouponService.postCoupon(req, res, (data) => {
      return res.json(data)
    })
  },

  putCoupon: (req, res, callback) => {
    adminCouponService.putCoupon(req, res, (data) => {
      return res.json(data)
    })
  },

  deleteCoupon: (req, res, callback) => {
    adminCouponService.deleteCoupon(req, res, (data) => {
      return res.json(data)
    })
  },

  getCoupons: (req, res, callback) => {
    adminCouponService.getCoupons(req, res, (data) => {
      return res.json(data)
    })
  },

}

module.exports = adminCouponController