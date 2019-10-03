const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const User = db.User

const userService = {

  signUp: (req, res, callback) => {

    const name = req.body.name === undefined ? '' : req.body.name.trim()
    const email = req.body.email === undefined ? '' : req.body.email.trim()
    const password = req.body.password === undefined ? '' : req.body.password.trim()
    const passwordCheck = req.body.passwordCheck === undefined ? '' : req.body.passwordCheck.trim()

    if (name.length == 0 || email.length == 0 || password.length == 0 || passwordCheck.length == 0) {
      return callback({ status: 'error', message: '請使用者輸入相關註冊資訊！' })
    } else {
      // Confirm password
      if (passwordCheck !== password) {
        return callback({ status: 'error', message: '兩次密碼輸入不同！' })
      } else {
        // Confirm unique user
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
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
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