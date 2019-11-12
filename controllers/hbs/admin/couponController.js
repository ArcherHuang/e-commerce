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

  getCouponEditPage: (req, res) => {
    try {
      //create a new coupon
      if (req.url === '/coupons/create') {
        return res.render('admin/couponEdit')
      } else {
        // edit a existing coupon
        couponService.getCoupons(req, res, (data) => {
          if (data['status'] === 'success') {
            let coupon = data.content
            return res.render('admin/couponEdit', { coupon: coupon })
          } else {
            return res.redirect('back')
          }
        })
      }
    }
    catch (err) {
      console.log(`Err: ${err}`)
      return res.redirect('back')
    }
  },
}

module.exports = couponController