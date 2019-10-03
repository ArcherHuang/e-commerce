const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt-nodejs')

const db = require('../models')
const User = db.User

let redisClient

let mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

const forgotPasswordService = {

  getRedisInstance: () => {
    if (redisClient == null) {
      redisClient = require('redis').createClient(process.env.REDIS_URL)
    }
    return redisClient
  },

  setRedisKey: (req, res, callback) => {

    const email = req.body.email === undefined ? '' : req.body.email.trim()

    if (email.length == 0) {
      return callback({ status: 'error', message: '請輸入 email ！' })
    } else {

      User.findOne({
        where: {
          email
        }
      }).then(user => {
        if (user) {

          const host = process.env.DEPLOY_SERVER
          const token = uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '')
          const item = JSON.stringify({
            email,
            token
          })

          let redisKey = `PASSWORD:RESET:${token}`
          let redisValue = item

          console.log(`Key: ${redisKey}, values: ${redisValue}`)

          forgotPasswordService.getRedisInstance().set(redisKey, redisValue, function () {
            forgotPasswordService.getRedisInstance().expire(redisKey, "300", function () {

              let data = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: `【 會員密碼重置確認信 】`,
                text: `
                ☆ 此信件為系統發出信件，請勿直接回覆，感謝您的配合 ☆

                親愛的會員 您好：
                請點選以下連結來重置您的網路帳號密碼
                
                ${host}/reset-password/${token}

                此連結將在 5 分鐘後逾時失效，逾時請再重新驗證申請。
                若您並無要求重置密碼，很有可能是遭有心人士使用；
                建議您加強您的會員密碼強度。
                `
              }

              mailgun.messages().send(data, (error, body) => {
                console.log(body)
                console.log(`Key: ${redisKey}, values: ${redisValue}`)
              })

              return callback({ status: 'success', message: `已寄送修改密碼通知信件到 ${email}` })

            })
          })

        } else {
          return callback({ status: 'error', message: '查無此 email ！' })
        }
      })

    }

  },

  getRedisKey: (req, res, callback) => {

    const token = req.params.token
    forgotPasswordService.getRedisInstance().get(`PASSWORD:RESET:${token}`, (err, reply) => {
      // console.log(`token: ${token}`)
      // console.log(`reply: ${reply}`)
      if (reply === null || reply === '') {
        return callback({ status: 'error', message: '5 分鐘的時效已過，請重新點選【 忘記密碼 】功能 ~' })
      } else {
        const parseReply = JSON.parse(reply)
        // console.log(`email: ${parseReply.email}`)
        req.session.mail = parseReply.email
        return callback({ status: 'success', message: '請輸入密碼進行密碼變更' })
      }

    })

  },

  resetPassword: (req, res, callback) => {

    const password = req.body.password === undefined ? '' : req.body.password.trim()
    const passwordCheck = req.body.passwordCheck === undefined ? '' : req.body.passwordCheck.trim()
    if (password.length == 0 || passwordCheck.length == 0) {
      return callback({ status: 'error', message: '請使用者輸入相關註冊資訊！' })
    } else {

      if (passwordCheck !== password) {
        return callback({ status: 'error', message: '兩次密碼輸入不同！' })
      } else {

        User.findOne({
          where: {
            email: req.session.mail
          }
        }).then((user) => {
          if (user) {
            user.update({
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
            }).then((user) => {
              req.session.mail = null
              return callback({ status: 'success', message: '密碼更新成功' })
            })
          }
        })
      }

    }

  },

}

module.exports = forgotPasswordService  