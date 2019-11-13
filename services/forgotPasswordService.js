const sendEmailService = require('./sendEmailService')
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt-nodejs')

const db = require('../models')
const User = db.User

let redisClient

const forgotPasswordService = {

  getRedisInstance: () => {
    if (redisClient == null) {
      redisClient = require('redis').createClient(process.env.REDIS_URL)
    }
    return redisClient
  },

  setRedisKey: (req, res, callback) => {

    try {
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
              forgotPasswordService.getRedisInstance().expire(redisKey, "300", async function () {

                let data = {
                  email,
                  subject: `【 會員密碼重置確認信 】`,
                  type: 'text',
                  info: `
                ☆ 此信件為系統發出信件，請勿直接回覆，感謝您的配合 ☆

                親愛的會員 您好：
                請點選以下連結來重置您的網路帳號密碼
                
                ${host}/accounts/reset-password/${token}

                此連結將在 5 分鐘後逾時失效，逾時請再重新驗證申請。
                若您並無要求重置密碼，很有可能是遭有心人士使用；
                建議您加強您的會員密碼強度。
                `
                }

                await sendEmailService.mailInfo(data)

                return callback({ status: 'success', message: `已寄送修改密碼通知信件到 ${email}` })

              })
            })
          } else {
            return callback({ status: 'error', message: '查無此 email ！' })
          }
        })
      }
    }
    catch (err) {
      console.log(`Err: ${err}`)
      return callback({ status: 'error', message: '寄送修改密碼通知信件失敗' })
    }
  },

  getRedisKey: (req, res, callback) => {
    try {
      const token = req.params.token
      forgotPasswordService.getRedisInstance().get(`PASSWORD:RESET:${token}`, (err, reply) => {
        // console.log(`token: ${token}`)
        // console.log(`reply: ${reply}`)
        if (reply === null || reply === '') {
          return callback({ status: 'error', message: '5 分鐘的時效已過或已進行過密碼變更，如需變更密碼請再重新點選【 忘記密碼 】功能 ~' })
        } else {
          const parseReply = JSON.parse(reply)
          // console.log(`email: ${parseReply.email}`)
          req.session.mail = parseReply.email
          req.session.token = token
          return callback({ status: 'success', message: '請輸入密碼進行密碼變更' })
        }

      })
    }
    catch (err) {
      console.log(`Err: ${err}`)
      return callback({ status: 'error', message: '取得忘記密碼連結失敗' })
    }
  },

  resetPassword: (req, res, callback) => {
    try {
      const password = req.body.password === undefined ? '' : req.body.password.trim()
      const passwordCheck = req.body.passwordCheck === undefined ? '' : req.body.passwordCheck.trim()
      if (password.length == 0 || passwordCheck.length == 0) {
        return callback({ status: 'error', message: '請使用者輸入相關註冊資訊！' })
      } else {

        if (passwordCheck !== password) {
          return callback({ status: 'error', message: '兩次密碼輸入不同!！' })
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
                forgotPasswordService.getRedisInstance().del(`PASSWORD:RESET:${req.session.token}`)
                req.session.token = null
                return callback({ status: 'success', message: '密碼更新成功' })
              })
            }
          })
        }

      }
    }
    catch (err) {
      console.log(`Err: ${err}`)
      return callback({ status: 'error', message: '密碼更新失敗' })
    }
  }
}

module.exports = forgotPasswordService  