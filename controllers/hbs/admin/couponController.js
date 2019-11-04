const couponService = require('../../../services/admin/couponService')

const couponController = {

  responseMessageAction: (req, res, data, successAction, errorAction) => {
    try {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        res.redirect(successAction)
      } else {
        req.flash('error_messages', data['message'])
        return res.redirect(errorAction)
      }
    }
    catch (err) {
      console.log(`Err: ${err}`)
      req.flash('error_messages', "Coupon 功能操作失敗")
      res.redirect('back')
    }
  },

  getCoupons: (req, res) => {
    couponService.getCoupons(req, res, (data) => {
      return res.render('admin/coupons', {
        [data['key']]: data['content']
      })
    })
  },

  postCoupon: (req, res) => {
    couponService.postCoupon(req, res, (data) => {
      couponController.responseMessageAction(req, res, data, '/admin/coupons', 'back')
    })
  },

  putCoupon: (req, res) => {
    couponService.putCoupon(req, res, (data) => {
      couponController.responseMessageAction(req, res, data, '/admin/coupons', 'back')
    })
  },

  deleteCoupon: (req, res) => {
    couponService.deleteCoupon(req, res, (data) => {
      couponController.responseMessageAction(req, res, data, '/admin/coupons', '/admin/coupons')
    })
  },
}

module.exports = couponController