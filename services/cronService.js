const express = require('express')
const CronJob = require('cron').CronJob
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const sendEmailService = require('./sendEmailService')
const notificationService = require('./admin/notificationService')

const db = require('../models')
const { User, Coupon, CouponDistribution, Cart, CartItem, Order, OrderItem, Product, Notification } = db

const cronService = {

  sendBirthdayCoupon: function () {
    // 每天 0 時執行
    // Seconds: 0 - 59
    // Minutes: 0 - 59
    // Hours: 0 - 23
    // Day of Month: 1 - 31
    // Months: 0 - 11(Jan - Dec)
    // Day of Week: 0 - 6(Sun - Sat)

    try {
      new CronJob('0 0 0 * * *', async function () {
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
              cronService.createAndSendCoupon(users[i].id, users[i].email, userBirthdayMonth + 1)
            }
          }

        }
      }, null, true, 'Asia/Taipei')
    }
    catch (err) {
      console.log(`sendBirthdayCoupon 執行失敗。Err: ${err}`)
    }
  },

  createAndSendCoupon: async function (userId, userEmail, userBirthdayMonth) {
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
          }).then(async () => {
            const data = {
              email: userEmail,
              subject: `【 專屬於您的優惠 】aja 商店會員 ${userBirthdayMonth} 月壽星生日禮! HAPPY BIRTHDAY!`,
              type: 'text',
              info: `
                ☆ 此信件為系統發出信件，請勿直接回覆，感謝您的配合 ☆

                親愛的會員 您好：
                在這特別的日子裡，
                aja 特別為您準備了 ${userBirthdayMonth} 月份壽星的生日折扣：25% 購物折扣
                Coupon 代碼：${sn}

                祝福您 生日快樂 心想事成！
                
                生日 Coupon 使用方法：
                1. 生日 Coupon 已轉入到您的會員帳戶內，請登入會員確認。
                2. 一張訂單限用一張 Coupon，結帳時可以直接抵扣訂單金額。
                3. 逾期或是抵扣後則不可再使用，此張生日 Coupon 有效期限為 30 天。
                `
            }

            await sendEmailService.mailInfo(data)
            // console.log(`成功建立並發送 Birthday Coupon 給使用者 ${userId} `)
            await Notification.create({
              type: "log",
              category: "coupon",
              content: `成功發送 Birthday coupon (id: ${coupon.id}) 給使用者 ${userEmail}`,
              dataStatus: 1
            })
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
  },

  deleteInvalidUser: function () {
    // 每隔 15 分鐘執行一次
    try {
      new CronJob('* */15 * * * *', async function () {

        // 找出帳號建立時間為15分鐘前、尚未通過驗證的使用者
        let users = await User.findAll({
          where: {
            isValid: false,
            createdAt: {
              [Op.lt]: moment().subtract(15, 'minutes')
            }
          }
        })

        // 從資料庫中刪除使用者
        for (let i = 0; i < users.length; i++) {
          User.findByPk(users[i].id).then(user => {
            user.destroy().then(async () => {
              //console.log(`刪除使用者 ${users[i].id} ${users[i].email} 成功`)
              await Notification.create({
                type: "log",
                category: "user",
                content: `使用者 ${users[i].email} 驗證逾期已被刪除`,
                dataStatus: 1
              })
            }).catch(err => {
              console.log(`刪除使用者 ${users[i].id} 失敗。Err: ${err}`)
            })
          })
        }
      }, null, true, 'Asia/Taipei')
    }
    catch (err) {
      console.log(`deleteInvalidUser 執行失敗。Err: ${err}`)
    }
  },

  deleteExpiredCoupon: function () {
    try {
      // 每天 0 時執行
      new CronJob('0 0 0 * * *', async function () {

        // 尋找過期 coupons
        let coupons = await Coupon.findAll({
          where: {
            dataStatus: 1,
            expireDate: {
              [Op.lt]: moment()
            }
          }
        })

        // 刪除過期 coupons
        for (let i = 0; i < coupons.length; i++) {
          await Coupon.findByPk(coupons[i].id).then(coupon => {
            coupon.update({
              dataStatus: 0
            }).then(async coupon => {
              // console.log(`刪除過期 coupon (id: ${coupons[i].id}) 成功`)
              await Notification.create({
                type: "log",
                category: "coupon",
                content: `刪除過期 coupon (id: ${coupon.id})`,
                dataStatus: 1
              })
            }).catch(err => {
              console.log(`刪除過期 coupon (id: ${coupons[i].id}) 失敗。Err: ${err}`)
            })
          })
        }
      }, null, true, 'Asia/Taipei')
    }
    catch (err) {
      console.log(`deleteExpiredCoupon 執行失敗。Err: ${err}`)
    }
  },

  deleteExpiredCart: function () {
    try {
      // 每天 0 時執行
      new CronJob('0 0 0 * * *', async function () {

        // 搜尋閒置超過兩天的 cart
        let expiredCarts = await Cart.findAll({
          where: { dataStatus: 1, updatedAt: { [Op.lt]: moment().add(-2, 'days') } },
          include: [
            CartItem,
            { model: Product, as: "items" },
          ]
        })

        for (let i = 0; i < expiredCarts.length; i++) {
          for (let j = 0; j < expiredCarts[i].CartItems.length; j++) {

            await CartItem.findOne({
              where: { dataStatus: 1, CartId: expiredCarts[i].id }
            }).then(async (cartItem) => {

              // 更新商品庫存
              await Product.findByPk(cartItem.ProductId).then(async product => {
                await product.update({
                  inventory: product.inventory + cartItem.quantity
                }).then(product => {
                  // 檢查庫存
                  notificationService.checkInventory(product.id)
                  console.log(`成功更新商品 (ID:${cartItem.ProductId}) 庫存，增加 ${cartItem.quantity}`)
                }).catch(err => { console.log(`更新商品庫存失敗，Err: ${err}`) })
              }).then(() => { }).catch(err => { console.log(`查詢商品失敗，Err: ${err}`) })

              // 刪除 cart item (更新 dataStatus, 商品數量為 0)
              await cartItem.update({ dataStatus: 0, quantity: 0 }).then(() => {
                console.log(`成功更新 CartItem`)
              }).catch(err => { console.log(`更新 CartItem 失敗，Err: ${err}`) })
            }).catch(err => { console.log(`Err: ${err}`) })
          }

          // 刪除 cart (更新 Cart 的 dataStatus)
          await Cart.findByPk(expiredCarts[i].id).then(cart => {
            cart.update({
              dataStatus: 0
            }).then(async cart => {

              await Notification.create({
                type: "log",
                category: "transaction",
                content: `刪除過期 cart (id: ${cart.id})`,
                dataStatus: 1
              })
              // console.log(`更新 Cart (ID: ${cart.id}) 成功`)
            }).catch(err => { console.log(`更新 Cart 失敗，Err: ${err}`) })
          })
        }

      }, null, true, 'Asia/Taipei')
    }
    catch (err) {
      console.log(`deleteExpiredCart 執行失敗。Err: ${err}`)
    }
  },

  deleteExpiredOrderItems: function () {
    try {
      // 每六小時執行一次
      new CronJob('0 0 */6 * * *', async function () {

        // 搜尋被「取消」超過兩天的 orders (dataStatus: 刪除 0 存在 1 取消 2)
        let expiredOrders = await Order.findAll({
          where: { dataStatus: 2, updatedAt: { [Op.lt]: moment().add(-2, 'days') } },
          include: [
            OrderItem,
            { model: Product, as: "items" },
          ]
        })

        for (let j = 0; j < expiredOrders.length; j++) {
          console.log(`Order: ${expiredOrders[j].id}`)
          for (let i = 0; i < expiredOrders[j].OrderItems.length; i++) {
            await OrderItem.findOne({
              where: { dataStatus: 1, OrderId: expiredOrders[j].id }
            }).then(async (item) => {
              console.log(`Item with product ${item.ProductId} & Q: ${item.quantity}`)
              let quantity = item.quantity
              // 更新商品庫存
              await Product.findByPk(item.ProductId).then(async (product) => {
                await product.update({ inventory: product.inventory + quantity }).then(product => {
                  // 檢查庫存
                  notificationService.checkInventory(product.id)
                  console.log(`成功更新商品 (ID:${item.ProductId}) 庫存，增加 ${quantity}`)
                }).catch(err => { console.log(`更新商品庫存失敗，Err: ${err}`) })
              }).catch(err => { console.log(`查詢商品失敗，Err: ${err}`) })

              // 刪除 order item (更新 dataStatus, 商品數量為 0)
              await item.update({ dataStatus: 0, quantity: 0 }).then(() => {
                console.log(`成功更新 OrderItem`)
              }).catch(err => { console.log(`更新 OrderItem 失敗，Err: ${err}`) })
            })
          }

          // 刪除訂單
          await expiredOrders[j].update({
            dataStatus: 0,                  // dataStatus: 刪除 0 存在 1 取消 2
          }).then(async () => {
            await Notification.create({
              type: "log",
              category: "transaction",
              content: `刪除過期 order (id: ${expiredOrders[j].id})`,
              dataStatus: 1
            })
            // console.log(`更新 Order dataStatus 成功`)
          }).catch(err => {
            console.log(`更新 Order dataStatus  失敗，Err: ${err}`)
          })
        }
        console.log(`deleteExpiredOrder 執行成功`)
      }, null, true, 'Asia/Taipei')
    }
    catch (err) {
      console.log(`deleteExpiredOrder 執行失敗。Err: ${err}`)
    }
  }

}

module.exports = cronService