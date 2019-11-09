const userService = require('../../../services/userService.js')
const adminCouponService = require('../../../services/admin/couponService')
const nodeRedService = require('../../../services/admin/nodeRedService')

const loginSendCouponController = {

  signInSendCoupon: (req, res) => {
    userService.signIn(req, res, (data) => {
      if (data['status'] === 'success') {
        req.params.coupon_id = req.body.coupon_id
        req.body.email = req.body.userEmail
        adminCouponService.sendCoupon(req, res, (data) => {
          return res.json(data)
        })
      } else {
        return res.json(data)
      }
    })
  },

  addTaskToNodeRedQueue: (req, res) => {
    console.log(`addTaskToNodeRedQueue___addTaskToNodeRedQueue`)
    nodeRedService.addTaskToQueue(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = loginSendCouponController