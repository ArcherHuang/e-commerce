const express = require('express');
const CronJob = require('cron').CronJob;
const moment = require('moment')

const db = require('../models')
const { User, Coupon, CouponDistribution } = db

const cronService = {

  sendBirthdayCoupon: function () {

    // 每天 0 時執行
    new CronJob('* * 0 * * *', async function () {
      // 取得現在時間
      let now = moment()
      let nowYear = moment(now).year()
      let nowMonth = moment(now).month()
      let nowDate = moment(now).date()

      // 取得所有使用者資料
      let users = await User.findAll().then(users => {
        return users
      })

      for (let i = 0; i < users.length; i++) {
        // 取得使用者生日的月份與日期
        let userBirthdayMonth = moment(users[i].birthday).month()
        let userBirthdayDate = moment(users[i].birthday).date()

        // 計算使用者生日與今天的距離
        let nowTime = moment([nowYear, nowMonth, nowDate])
        let userBirthday = moment([nowYear, userBirthdayMonth, userBirthdayDate])
        let diff = userBirthday.diff(nowTime, 'days')

        // 若使用者的生日距今天一週（7 days），則建立並發送 Birthday Coupon
        if (users[i].role) {
          if ((diff > 0 && diff <= 7) || (diff <= -358)) {
            cronService.createAndSendCoupon(users[i].id)
          }
        }

      }
    }, null, true, 'Asia/Taipei');
  },

  createAndSendCoupon: async function (userId) {
    try {
      // 檢查今年是否已經發過 Birthday Coupon 給該使用者
      let checkResult = await CouponDistribution.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Coupon,
            where: { name: 'Birthday Coupon' }
          }],
        order: [['createdAt', 'DESC']]
      }).then(distributions => {
        let nowYear = moment().year()
        if (nowYear === moment(distributions[0].createdAt).year()) {
          return true
        } else {
          return false
        }
      }).catch(err => {
        return false
      })

      // 建立新的 Birthday Coupon
      if (!checkResult) {

        // 建立 coupon 序號
        let sn = Date.now()
        sn = 'HBD' + Math.random().toString(36).slice(-4) + sn
        sn = sn.toUpperCase()

        // 建立新的 Birthday Coupon
        await Coupon.create({
          name: 'Birthday Coupon',
          sn: sn,
          discount: 25,
          numberOfLimitation: 1,
          expireDate: moment().add(1, 'M'),
          amount: 0,
          dataStatus: 1
        }).then(coupon => {

          // 發送新的 Birthday Coupon
          return CouponDistribution.create({
            CouponId: coupon.id,
            UserId: userId,
            usageStatus: 1
          }).then(() => {
            console.log(`成功建立並發送 Birthday Coupon 給使用者 ${userId} `)
          }).catch(err => {
            console.log(`發送 Birthday Coupon 給使用者  ${userId} 失敗。Err: `, err)
          })
        }).catch(err => {
          console.log(`建立 Birthday Coupon 給使用者 ${userId} 失敗。Err: `, err)
        })
      } else {
        console.log(`今年已發送 Birthday Coupon 給使用者 ${userId}`)
      }
    }
    catch (err) {
      console.log(`建立並發送 Birthday Coupon 給使用者  ${userId} 失敗。Err: `, err)
    }
  }
}

module.exports = cronService