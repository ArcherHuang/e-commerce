const db = require('../models')
const User = db.User

const adminService = {

  editUsers: (req, res, callback) => {

    User.findAll().then(users => {
      return callback({ status: 'success', users })
    })

  },

  putUsers: (req, res, callback) => {

    return User.findByPk(req.params.id)
      .then(user => {
        const {
          role
        } = user

        if (role) {
          user.update({
            role: null
          })
            .then(user => {
              return callback({ status: 'success', message: `${user.email} 帳號已設定為一般用戶！` })
            })
        } else {
          user.update({
            role: 'admin'
          })
            .then(user => {
              return callback({ status: 'success', message: `${user.email} 帳號已設定為管理員！` })
            })
        }
      })

  },

}

module.exports = adminService  