const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const moment = require('moment')

const db = require('../models')
const { User, Product, Order } = db

const userService = {

  checkUserField: (data) => {
    const name = data.name === undefined ? '' : data.name.trim()
    const phone = data.phone === undefined ? '' : data.phone.trim()
    const address = data.address === undefined ? '' : data.address.trim()
    const birthday = data.birthday === undefined ? '' : data.birthday.trim()

    if (birthday.length !== 0 && moment(birthday, 'YYYY-MM-DD', true).isValid()) {
      if (moment(birthday).isAfter(new Date())) {
        return ({ status: 'error', message: 'birthday 請輸入今日以前日期' })
      }
    } else if (birthday.length !== 0 && !moment(birthday, 'YYYY-MM-DD', true).isValid()) {
      return ({ status: 'error', message: 'birthday 請輸入正確的日期格式 YYYY-MM-DD' })
    }
    return ({ status: 'success', message: 'User 欄位確認正確' })
  },

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

    // 用 session 紀錄 user 資訊
    req.session.user = user

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

  getProfile: (req, res, callback) => {
    try {
      return User.findAll({
        where: {
          id: req.session.user.id
        },
        include: [
          { model: Product, as: "productLiked" },
          { model: Product, as: "productViewed" },
          { model: Product, as: "productReviewed" },
        ]
      }).then(result => {
        let user = result[0]

        // 將有瀏覽過的商品，加入是否 like 過的紀錄
        user.productViewed = user.productViewed.map(r => ({
          ...r,
          isLiked: user.productLiked.map(d => d.id).includes(r.id)
        }))

        return callback({ status: 'success', message: '取得使用者頁面成功', content: user })
      }).catch(err => {
        return callback({ status: 'error', message: '無法取得使用者頁面' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '無法取得使用者頁面' })
    }
  },

  putProfile: (req, res, callback) => {

    try {
      const userFieldCheckResult = userService.checkUserField(req.body)
      if (userFieldCheckResult.status === 'success') {
        return User.findByPk(req.session.user.id)
          .then((user) => {
            if (!user) {
              return callback({ status: 'error', message: '使用者不存在' })
            }
            user.update({
              name: req.body.name,
              phone: req.body.phone,
              address: req.body.address,
              birthday: req.body.birthday,
            }).then((user) => {
              return callback({ status: 'success', message: '使用者資料更新成功!' })
            })
          })
      } else {
        return callback(userFieldCheckResult)
      }
    }
    catch (err) {
      return callback({ status: 'error', message: '無法更新使用者資料' })
    }
  },

  getOrders: (req, res, callback) => {
    try {
      Order.findAll({
        where: {
          UserId: req.session.user.id
        },
        order: [['updatedAt', 'DESC']],
      }).then(orders => {
        return callback({ status: 'success', message: '成功取得訂單清單', content: orders })
      }).catch(err => {
        return callback({ status: 'error', message: '無法取得訂單清單' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '無法取得訂單清單' })
    }
  },
}

module.exports = userService  