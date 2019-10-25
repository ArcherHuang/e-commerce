const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const moment = require('moment')

const db = require('../models')
const { Carousel, Category, User, Product, Like, Order, OrderItem, Review } = db

const productService = {

  getProducts: async (req, res, callback) => {

    let carousels = await Carousel.findAll({
      where: {
        dataStatus: 1
      }
    })
    let categories = await Category.findAll({
      where: {
        dataStatus: 1
      }
    })
    let currentUser

    if (req.session.user) {
      currentUser = await User.findByPk(req.session.user.id)
    } else {
      currentUser = []
    }

    if (req.query.category_id && req.query.keyword) {
      const keyword = req.query.keyword ? req.query.keyword : null
      return Product.findAll({
        include: [Category],
        where: {
          dataStatus: 1,
          CategoryId: req.query.category_id ? req.query.category_id : null,
          [Op.or]: [
            { name: { [Op.like]: '%' + keyword + '%' } },
            { description: { [Op.like]: '%' + keyword + '%' } }
          ]
        },
        order: [['updatedAt', 'DESC']]
      }).then(products => {
        if (products.length !== 0) {
          return callback({ status: 'success', message: '取得搜尋產品清單成功', content: products, carousels: carousels, categories: categories, currentUser: currentUser })
        } else {
          return Product.findAll({ include: [Category] }).then(products => {
            return callback({ status: 'success', message: '該搜尋沒有產品，取得所有產品清單成功', content: products, carousels: carousels, categories: categories, currentUser: currentUser })
          })
        }
      })

    } else if (req.query.category_id || req.query.keyword) {
      const keyword = req.query.keyword ? req.query.keyword : null
      return Product.findAll({
        include: [Category],
        where: {
          dataStatus: 1,
          [Op.or]: [
            { CategoryId: req.query.category_id ? req.query.category_id : null, },
            { name: { [Op.like]: '%' + keyword + '%' } },
            { description: { [Op.like]: '%' + keyword + '%' } }
          ]
        },
        order: [['updatedAt', 'DESC']]
      }).then(products => {
        if (products.length !== 0) {
          return callback({ status: 'success', message: '取得搜尋產品清單成功', content: products, carousels: carousels, categories: categories, currentUser: currentUser })
        } else {
          return Product.findAll({ include: [Category] }).then(products => {
            return callback({ status: 'success', message: '該搜尋沒有產品，取得所有產品清單成功', content: products, carousels: carousels, categories: categories, currentUser: currentUser })
          })
        }
      })
    } else {
      return Product.findAll({ include: [Category] }).then(products => {
        return callback({ status: 'success', message: '取得所有產品清單成功', content: products, carousels: carousels, categories: categories, currentUser: currentUser })
      })
    }
  },

  getProduct: (req, res, callback) => {

    return Product.findByPk(req.params.product_id, { include: [Category] }).then(product => {
      return callback({ status: 'success', message: '取得特定產品成功', content: product })
    })

  },

  likeProduct: async (req, res, callback) => {

    let product = await Product.findByPk(req.params.product_id)
    let like = await Like.findOne({
      where: {
        UserId: req.user.id,
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
        }).then(like => {
          return callback({ status: 'success', message: 'Like 商品成功' })
        })
      }
    } else {
      // 商品存在，like 紀錄尚未存在
      Like.create({
        UserId: req.user.id,
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
          UserId: req.user.id,
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
  },

  postReview: async (req, res, callback) => {
    try {
      // 檢查使用者是否購買過此商品
      let result = await Order.findAll({
        where: {
          UserId: req.user.id,
          paymentStatus: 1
        },
        include: [
          {
            model: Product,
            as: 'items',
            where: { id: req.params.product_id }
          }
        ]
      }).then(orders => {
        return orders
      })
      // 若已購買商品數量大於等於 1
      if (result.length >= 1) {
        // 建立新的評論
        return Review.create({
          review: req.body.review,
          UserId: req.user.id,
          ProductId: req.params.product_id,
          dataStatus: 1
        }).then(review => {
          return callback({ status: 'success', message: '使用者評論商品成功', content: review })
        }).catch(err => {
          return callback({ status: 'error', message: '使用者評論失敗' })
        })
      } else {
        // 若已購買商品數量等於 0
        return callback({ status: 'error', message: '使用者並未購買過此商品，無法建立評論' })
      }
    }
    catch (err) {
      return callback({ status: 'error', message: '使用者評論失敗' })
    }
  },

  putReview: async (req, res, callback) => {
    try {
      return Review.findOne({
        where: {
          id: req.params.review_id,
          UserId: req.user.id,
          ProductId: req.params.product_id
        }
      }).then(review => {

        review.update({
          review: req.body.review || review.review
        }).then(review => {
          return callback({ status: 'success', message: '使用者更新評論成功', content: review })
        }).catch(err => {
          return callback({ status: 'error', message: '使用者更新評論失敗', content: err })
        })
      }).catch(err => {
        return callback({ status: 'error', message: '評論不存在', content: err })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '使用者更新評論失敗', content: err })
    }
  }
}

module.exports = productService  