const express = require('express');
const CronJob = require('cron').CronJob;
const moment = require('moment')

const db = require('../models')
const { User, Coupon, CouponDistribution } = db

const cronService = {

  sendBirthdayCoupon: function () {
    new CronJob('10 * * * * *', async function () {
      console.log('cron works!')
      // 現在時間
      let nowTime = moment()
      // 現在時間 plus one week
      let oneWeekPeriod = nowTime + 60 * 60 * 1000 * 24 * 7

      // let users = await User.findAll().then(users => {
      //   return users
      // })

      // console.log(users)
      // for (let i = 0; i < users.length; i++) {
      //   if ((oneWeekPeriod - moment(users[i].birhtday)) > 0) {
      //     console.log(`id: ${users[i].id}`)
      //     console.log(`送出 coupon 給 ${users[i].name}`)
      //   } else {
      //     console.log(`不用送出 coupon 給 ${users[i].name}`)
      //   }
      // }
      // 建立 coupon 
      // function createCoupon() {
      // }

    }, null, true, 'America/Los_Angeles');
  }
}

module.exports = cronService