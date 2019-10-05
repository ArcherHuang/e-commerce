const forgotPasswordService = require('../services/forgotPasswordService.js')

const forgetPasswordController = {

  setRedisKey: (req, res) => {
    forgotPasswordService.setRedisKey(req, res, (data) => {
      return res.json(data)
    })
  },

  getRedisKey: (req, res) => {
    forgotPasswordService.getRedisKey(req, res, (data) => {
      return res.json(data)
    })
  },

  resetPassword: (req, res) => {
    forgotPasswordService.resetPassword(req, res, (data) => {
      return res.json(data)
    })
  },

}

module.exports = forgetPasswordController