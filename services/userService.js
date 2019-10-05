const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const moment = require('moment')

const db = require('../models')
const User = db.User

const userService = {

  signIn: async (req, res, callback) => {

    const email = req.body.email === undefined ? '' : req.body.email.trim()
    const password = req.body.password === undefined ? '' : req.body.password.trim()

    if (email.length == 0 || password.length == 0) {
      return callback({ status: 'error', message: '請輸入登入資訊 !' })
    }

    if (!validator.isEmail(email)) {
      return callback({ status: 'error', message: '請輸入正確的 email !' })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ status: 'error', message: '使用者不存在' })
    if (!bcrypt.compareSync(password, user.password)) {
      return callback({ status: 'error', message: '密碼不正確' })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return callback({
      status: 'success', message: '登入成功', token, user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  },

  signUp: (req, res, callback) => {

    const name = req.body.name === undefined ? '' : req.body.name.trim()
    const email = req.body.email === undefined ? '' : req.body.email.trim()
    const password = req.body.password === undefined ? '' : req.body.password.trim()
    const passwordCheck = req.body.passwordCheck === undefined ? '' : req.body.passwordCheck.trim()
    const phone = req.body.phone === undefined ? '' : req.body.phone.trim()
    const address = req.body.address === undefined ? '' : req.body.address.trim()
    const birthday = req.body.birthday === undefined ? '' : req.body.birthday.trim()

    if (name.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      passwordCheck.length == 0 ||
      phone.length == 0 ||
      address.length == 0 ||
      birthday.length == 0) {
      return callback({ status: 'error', message: '請使用者輸入相關註冊資訊！' })
    } else {
      if (!validator.isEmail(email)) {
        return callback({ status: 'error', message: '請輸入正確的 email !' })
      }

      if (!moment(birthday, 'YYYY-MM-DD', true).isValid()) {
        return callback({ status: 'error', message: '請輸入正確的格式，birthday 為日期格式' })
      }

      // Confirm password
      if (passwordCheck !== password) {
        return callback({ status: 'error', message: '兩次密碼輸入不同！' })
      } else {

        User.findOne({
          where: {
            email
          }
        }).then((user) => {
          if (user) {
            return callback({ status: 'error', message: '信箱重複！' })
          } else {
            User.create({
              name,
              email,
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
              phone,
              address,
              birthday
            }).then((user) => {
              return callback({ status: 'success', message: '成功註冊帳號！', user })
            })
          }
        })

      }
    }

  },

}

module.exports = userService  