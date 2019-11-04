const validator = require('validator')
const moment = require('moment')
const { Op } = require('sequelize')

const db = require('../../models')
const { Coupon, CouponDistribution, User, Notification } = db
const sendEmailService = require('../sendEmailService')

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
    const discount = data.discount === undefined ? '' : data.discount.trim() === '0' ? '' : data.discount.trim()
    const expire_date = data.expire_date === undefined ? '' : data.expire_date.trim()
    const amount = data.amount === undefined ? '' : data.amount.trim() === '0' ? '' : data.amount.trim()

    if (discount.length !== 0 && amount.length !== 0) {
      return ({ status: 'error', message: 'discount 與 amount 請擇一輸入' })
    } else if (discount.length == 0 && amount.length == 0) {
      return ({ status: 'error', message: 'discount 與 amount 請擇一輸入' })
    } else if (discount.length !== 0) {
      if (!validator.isInt(discount, { min: 1 })) {
        return ({ status: 'error', message: 'discount 請輸入至少大於 1' })
      }
    } else if (amount.length !== 0) {
      if (!validator.isInt(amount, { min: 1 })) {
        return ({ status: 'error', message: 'amount 請輸入至少大於 1' })
      }
    }

    if (name.length == 0 || number_of_limitation.length == 0 || expire_date.length == 0) {
      return ({ status: 'error', message: '請輸入 Coupon 相關資訊' })
    } else {

      if (validator.isInt(number_of_limitation, { min: 1 }) &&
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
        numberOfLimitation: req.body.number_of_limitation.trim(),
        discount: req.body.discount === undefined ? 0 : req.body.discount.trim() === '' ? 0 : req.body.discount.trim(),
        amount: req.body.amount === undefined ? 0 : req.body.amount.trim() === '' ? 0 : req.body.amount.trim(),
        expireDate: req.body.expire_date.trim()
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
            numberOfLimitation: req.body.number_of_limitation.trim(),
            discount: req.body.discount === undefined ? 0 : req.body.discount.trim() === '' ? 0 : req.body.discount.trim(),
            amount: req.body.amount === undefined ? 0 : req.body.amount.trim() === '' ? 0 : req.body.amount.trim(),
            expireDate: req.body.expire_date.trim()
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

    Coupon.findByPk(req.params.coupon_id)
      .then((coupon) => {
        if (coupon) {
          coupon.update({
            dataStatus: 0
          })
            .then((coupon) => {
              callback({ status: 'success', message: 'Coupon 已刪除成功' })
            })
        } else {
          callback({ status: 'fail', message: '查無此 Coupon 存在' })
        }

      })

  },

  getCoupons: (req, res, callback) => {

    Coupon.findAll().then(coupons => {

      if (req.params.coupon_id) {
        Coupon.findByPk(req.params.coupon_id)
          .then((coupon) => {
            return callback({ status: 'success', message: '取得特定 Coupon 資料', content: coupon, key: 'coupon' })
          })
      } else {
        return callback({ status: 'success', message: '取得 Coupon 所有清單', content: coupons, key: 'coupons' })
      }

    })

  },

  sendCoupon: async (req, res, callback) => {

    try {
      // 檢查 coupon 是否存在，且數量大於 1
      let coupon = await Coupon.findOne({
        where:
        {
          id: req.params.coupon_id,
          dataStatus: 1,
          numberOfLimitation: {
            [Op.gte]: 1
          }
        }
      })

      // 檢查使用者是否存在且通過驗證
      let user = await User.findOne({
        where: {
          email: req.body.email,
          isValid: true || 1
        }
      })

      if (coupon && user) {
        // 發送 coupon 給使用者
        await CouponDistribution.create({
          UserId: user.id,
          CouponId: coupon.id,
          usageStatus: 1
        })

        // 調整 coupon 數量
        await coupon.update({
          numberOfLimitation: coupon.numberOfLimitation - 1
        })

        // 發送通知給使用者
        const data = {
          email: user.email,
          subject: `【 AJA Online Store 】您獲得一張新的優惠券！`,
          type: 'text',
          info: `
                ☆ 此信件為系統發出信件，請勿直接回覆，感謝您的配合 ☆

                親愛的會員 您好：
                您獲得了一張優惠券 ${coupon.name}，Coupon 代碼為：${coupon.sn}

                祝福您 購物愉快！
                
                Coupon 使用方法：
                1. Coupon 已轉入到您的會員帳戶內，請登入會員確認。
                2. 一張訂單限用一張 Coupon，結帳時可以直接抵扣訂單金額。
                3. 逾期或是抵扣後則不可再使用，有效期限請參見您的會員帳戶。
                `
        }

        await sendEmailService.mailInfo(data)

        // 系統記錄
        await Notification.create({
          type: "log",
          category: "coupon",
          content: `成功發送 coupon (id: ${coupon.id}) 給使用者 ${user.email}`,
          dataStatus: 1
        })

        return callback({ status: 'success', message: '發送 coupon 成功' })

      } else {
        return callback({ status: 'error', message: '發送 coupon 失敗，找不到對應的 coupon 與使用者' })
      }
    }
    catch (err) {
      return callback({ status: 'error', message: '發送 coupon 失敗', content: err })
    }
  },

  getCouponHistory: async (req, res, callback) => {

    try {
      await CouponDistribution.findAll({
        include: [Coupon, User],
        order: [['updatedAt', 'DESC']]
      }).then(result => {
        return callback({ status: 'success', message: '取得 Coupon 使用紀錄成功', content: result })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '取得 Coupon 使用紀錄失敗', content: err })
    }
  }
}

module.exports = adminCouponService  