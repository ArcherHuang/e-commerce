const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const moment = require('moment')

const db = require('../models')
const { User, Product, Like } = db

const productService = {

  likeProduct: async (req, res, callback) => {

    let product = await Product.findByPk(req.params.product_id)
    let like = await Like.findOne({
      where: {
        UserId: req.session.user.id,
        ProductId: req.params.product_id,
      }
    })

    if (!product) {
      // 商品不存在
      return callback({ status: 'error', message: '商品不存在' })
    } else if (like) {
      if (like.dataStatus === 1) {
        // 商品存在，like 紀錄存在，已被使用者 like
        return callback({ status: 'error', message: '商品已 like，無法重複 like' })
      } else if (like.dataStatus === 0) {
        // 商品存在，like 紀錄存在，但未被使用者 like
        like.update({
          dataStatus: 1
        }).then(liek => {
          return callback({ status: 'success', message: 'Like 商品成功' })
        })
      }
    } else {
      // 商品存在，like 紀錄尚未存在
      Like.create({
        UserId: req.session.user.id,
        ProductId: req.params.product_id,
        dataStatus: 1
      }).then(liek => {
        return callback({ status: 'success', message: 'Like 商品成功' })
      })
    }
  },

  unlikeProduct: (req, res, callback) => {
    try {
      Like.findOne({
        where: {
          UserId: req.session.user.id,
          ProductId: req.params.product_id,
          dataStatus: 1,
        }
      }).then(like => {
        // like 紀錄存在且 dataStatus = 1
        if (like) {
          like.update({
            dataStatus: 0,
          }).then(like => {
            return callback({ status: 'success', message: 'UnLike 商品成功' })
          }).catch(err => {
            return callback({ status: 'error', message: 'Unlike 商品失敗' })
          })
        } else {
          // like 紀錄不存在，或 like 紀錄存在但 dataStatus = 0
          return callback({ status: 'error', message: 'Unlike 商品失敗' })
        }
      }).catch(err => {
        return callback({ status: 'error', message: 'Unlike 商品失敗' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: 'UnLike 商品失敗' })
    }
  }
}

module.exports = productService  