const validator = require('validator')
const moment = require('moment')
const { Op } = require('sequelize')

const db = require('../models')
const Coupon = db.Coupon

const adminCouponService = {

  generateSn: () => {

    return new Promise(resolve => {
      let coupon = ''
      const possible = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'

      while (coupon === '') {
        for (let i = 0; i < 8; i++) {
          coupon += possible.charAt(Math.floor(Math.random() * possible.length))
        }

        Coupon.findOne({
          where: {
            sn: coupon,
            expire_date: {
              [Op.gt]: new Date()
            }
          }
        }).then((cou) => {
          if (cou) {
            // sn 重複且存在資料庫中的尚未過期，須重新產生新的 sn
            coupon = ''
          }
        })
      }
      resolve(coupon)
    })

  },

  checkCouponField: (data) => {

    const name = data.name === undefined ? '' : data.name.trim()
    const number_of_limitation = data.number_of_limitation === undefined ? '' : data.number_of_limitation.trim()
    const discount = data.discount === undefined ? '' : data.discount.trim()
    const expire_date = data.expire_date === undefined ? '' : data.expire_date.trim()

    if (name.length == 0 || number_of_limitation.length == 0 || discount.length == 0 || expire_date.length == 0) {
      return ({ status: 'error', message: '請輸入 Coupon 相關資訊' })
    } else {

      if (validator.isInt(number_of_limitation, { min: 1 }) &&
        validator.isInt(discount, { min: 1 }) &&
        moment(expire_date, 'YYYY-MM-DD', true).isValid()) {

        if (!moment(expire_date).isAfter(new Date())) {
          return ({ status: 'error', message: 'expire_date 請輸入大於今日的日期' })
        }

      } else {
        return ({ status: 'error', message: '請輸入正確的 Coupon 格式，number_of_limitation 與 discount 為大於 1 的整數、expire_date 為日期格式' })
      }

    }

    return ({ status: 'success', message: 'Coupon 欄位確認正確' })

  },

  postCoupon: async (req, res, callback) => {

    const couponFieldCheckResult = adminCouponService.checkCouponField(req.body)
    if (couponFieldCheckResult.status === 'success') {
      Coupon.create({
        name: req.body.name.trim(),
        sn: await adminCouponService.generateSn(),
        number_of_limitation: req.body.number_of_limitation.trim(),
        discount: req.body.discount.trim(),
        expire_date: req.body.expire_date.trim()
      }).then((coupon) => {
        return callback({ status: 'success', message: 'Coupon 建立成功' })
      })
    } else {
      return callback(couponFieldCheckResult)
    }

  },

  putCoupon: (req, res, callback) => {

    const couponFieldCheckResult = adminCouponService.checkCouponField(req.body)
    if (couponFieldCheckResult.status === 'success') {
      Coupon.findByPk(
        req.params.coupon_id
      ).then((coupon) => {
        if (coupon) {
          coupon.update({
            name: req.body.name.trim(),
            number_of_limitation: req.body.number_of_limitation.trim(),
            discount: req.body.discount.trim(),
            expire_date: req.body.expire_date.trim()
          }).then((coupon) => {
            return callback({ status: 'success', message: 'Coupon 更新成功' })
          })
        }
      })
    } else {
      return callback(couponFieldCheckResult)
    }

  },

  deleteCoupon: (req, res, callback) => {

    Coupon.destroy({
      where: {
        id: req.params.coupon_id
      }
    }).then(() => {
      return callback({ status: 'success', message: 'Coupon 已刪除' })
    })

  },

  getCoupons: (req, res, callback) => {

    Coupon.findAll().then(coupons => {

      if (req.params.coupon_id) {
        Coupon.findByPk(req.params.coupon_id)
          .then((coupon) => {
            return callback({ status: 'success', message: '取得特定 Coupon 資料', content: coupon })
          })
      } else {
        return callback({ status: 'success', message: '取得 Coupon 所有清單', content: coupons })
      }

    })

  },

}

module.exports = adminCouponService  