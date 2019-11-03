const sendEmailService = require('./sendEmailService')
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt-nodejs')

const db = require('../models')
const { User } = db

let redisClient

const signUpValidEmailService = {

  getRedisInstance: () => {
    if (redisClient == null) {
      redisClient = require('redis').createClient(process.env.REDIS_URL)
    }
    return redisClient
  },

  setEmailLinkKey: email => {

    return new Promise(resolve => {

      const host = process.env.DEPLOY_VIEW_SERVER || "http://localhost:3000"
      const token = uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '')
      const item = JSON.stringify({
        email,
        token
      })

      let redisKey = `PASSWORD:RESET:${token}`
      let redisValue = item

      // console.log(`Key: ${redisKey}, values: ${redisValue}`)

      signUpValidEmailService.getRedisInstance().set(redisKey, redisValue, function () {
        signUpValidEmailService.getRedisInstance().expire(redisKey, "300", async function () {

          let data = {
            email,
            subject: `【 會員 email 確認信 】`,
            type: 'text',
            info: `
                ☆ 此信件為系統發出信件，請勿直接回覆，感謝您的配合 ☆

                親愛的會員 您好：
                請點選以下連結來驗證 email
                
                ${host}/accounts/email-valid/${token}

                此連結將在 5 分鐘後逾時失效，逾時請再重新驗證申請。
                `
          }

          await sendEmailService.mailInfo(data)

          resolve({ status: 'success', message: '請使用者收取認證信，以驗證 email！' })

        })
      })

    })

  },

  checkEmailLink: (token) => {

    return new Promise(resolve => {
      signUpValidEmailService.getRedisInstance().get(`PASSWORD:RESET:${token}`, (err, reply) => {
        // console.log(`token: ${token}`)
        // console.log(`reply: ${reply}`)
        if (reply === null || reply === '') {
          resolve({ status: 'error', message: '5 分鐘的時效已過，請重新註冊帳號 ~' })
        } else {
          const parseReply = JSON.parse(reply)
          // console.log(`email: ${parseReply.email}`)
          User.findOne({
            where: {
              email: parseReply.email
            }
          }).then((user) => {
            if (user) {
              user.update({
                isValid: 1
              }).then((user) => {
                resolve({ status: 'success', message: 'email 認證成功' })
              })
            } else {
              resolve({ status: 'error', message: 'email 不存在' })
            }
          })

        }

      })

    })

    // signUpValidEmailService.getRedisInstance().get(`PASSWORD:RESET:${token}`, (err, reply) => {
    //   console.log(`token: ${token}`)
    //   console.log(`reply: ${reply}`)
    //   if (reply === null || reply === '') {
    //     return callback({ status: 'error', message: '5 分鐘的時效已過，請重新註冊帳號 ~' })
    //   } else {
    //     const parseReply = JSON.parse(reply)
    //     console.log(`email: ${parseReply.email}`)

    //     User.findOne({
    //       where: {
    //         email: parseReply.email
    //       }
    //     }).then((user) => {
    //       if (user) {
    //         user.update({
    //           isValid: 1
    //         }).then((user) => {
    //           return ({ status: 'success', message: 'email 認證成功' })
    //         })
    //       } else {
    //         return ({ status: 'error', message: 'email 不存在' })
    //       }
    //     })

    //   }

    // })

  },

  resetPassword: (req, res, callback) => {



  },

}

module.exports = signUpValidEmailService  