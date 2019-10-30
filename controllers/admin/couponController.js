const adminCouponService = require('../../services/admin/couponService')

const couponController = {

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

  sendCoupon: (req, res, callback) => {
    adminCouponService.sendCoupon(req, res, (data) => {
      return res.json(data)
    })
  },

  getCouponHistory: (req, res, callback) => {
    adminCouponService.getCouponHistory(req, res, (data) => {
      return res.json(data)
    })
  },

}

module.exports = couponController