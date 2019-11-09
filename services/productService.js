const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const moment = require('moment')
const userService = require('../services/userService.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = require('../models')
const { Carousel, Category, User, Product, Like, Order, OrderItem, Review, PageView } = db

const productService = {

  getProducts: async (req, res, callback) => {
    try {
      // 此程式會取出的資料
      let products
      let currentUser
      let carousels
      let categories

      // 取出 carousels
      carousels = await Carousel.findAll({ where: { dataStatus: 1 } })
      // 取出 categories
      categories = await Category.findAll({ where: { dataStatus: 1 } })
      // 取出 current user  
      if (req.user) {
        // currentUser = await User.findByPk(req.session.user.id)
        currentUser = await User.findAll({
          where: {
            id: req.user.id
          },
          include: [
            Review,
            { model: Product, as: "productLiked" },
            { model: Product, as: "productViewed" },
            { model: Product, as: "productReviewed" },
          ]
        })
      } else {
        currentUser = []
      }

      // 取出商品
      if (req.query.category_id && req.query.keyword) {
        // 若同時存在分類與關鍵字搜尋，會優先搜尋分類，再搜尋關鍵字
        const keyword = req.query.keyword ? req.query.keyword : null
        products = await Product.findAll({
          include: [Category, Review],
          where: {
            dataStatus: 1,
            CategoryId: req.query.category_id ? req.query.category_id : null,
            [Op.or]: [
              { name: { [Op.like]: '%' + keyword + '%' } },
              { description: { [Op.like]: '%' + keyword + '%' } }
            ]
          },
          order: [['updatedAt', 'DESC']]
        })
      } else if (req.query.category_id || req.query.keyword) {
        // 若分類與關鍵字搜尋其中之一存在
        const keyword = req.query.keyword ? req.query.keyword : null
        products = await Product.findAll({
          include: [Category, Review],
          where: {
            dataStatus: 1,
            [Op.or]: [
              { CategoryId: req.query.category_id ? req.query.category_id : null, },
              { name: { [Op.like]: '%' + keyword + '%' } },
              { description: { [Op.like]: '%' + keyword + '%' } }
            ]
          },
          order: [['updatedAt', 'DESC']]
        })
      } else {
        // 沒有分類或關鍵字搜尋，取出所有商品
        products = await Product.findAll({ include: [Category, Review] })
      }

      // pagination setting
      const pageLimit = 12
      let offset = 0
      let page
      let pages = Math.ceil(products.length / pageLimit)
      let totalPages = Array.from({ length: pages }).map((item, index) => index + 1)

      // 驗證 page，避免有小於 1 或大於 totalPages 數量的值輸入
      if (Number(req.query.page) > totalPages.length) {
        page = totalPages.length
      } else if (Number(req.query.page) < 1) {
        page = 1
      } else {
        page = Number(req.query.page) || 1
      }

      if (page) { offset = (page - 1) * pageLimit }
      let prev = page - 1 < 1 ? 1 : page - 1
      let next = page + 1 > pages ? pages : page + 1
      let theLastProductIndex = offset + pageLimit

      products = products.slice(offset, theLastProductIndex)

      return callback({
        status: 'success',
        message: '取得搜尋產品清單成功',
        content: products,
        carousels: carousels,
        categories: categories,
        currentUser: currentUser,
        totalPages: totalPages,
        prev: prev,
        next: next
      })
    }
    catch (err) {
      console.log(`Err: ${err}`)
      return callback({
        status: 'error',
        message: '取得搜尋產品清單失敗',
      })
    }
  },

  getProduct: async (req, res, callback) => {
    try {

      let currentUser
      await userService.getProfile(req, res, (data) => {
        currentUser = data
        return currentUser
      })

      await Product.findByPk(req.params.product_id, { include: [Category, Review, PageView] }).then(product => {
        if (req.session.user) {
          return PageView.findOrCreate({
            where: {
              UserId: req.session.user.id,
              ProductId: req.params.product_id
            },
            default: {
              UserId: req.session.user.id,
              ProductId: req.params.product_id,
              viewCount: 0
            }
          }).spread((pageView, created) => {
            return pageView.update({
              viewCount: (pageView.viewCount || 1) + 1
            }).then(pageView => {
              return callback({ status: 'success', message: '取得特定產品成功', content: product, currentUser: currentUser })
            }).catch(err => {
              return callback({ status: 'error', message: '增加商品瀏覽紀錄失敗', content: err })
            })
          }).catch(err => {
            return callback({ status: 'error', message: '取得特定產品失敗', content: err })
          })
        } else {
          return PageView.findOrCreate({
            where: {
              UserId: null,
              ProductId: req.params.product_id
            },
            default: {
              UserId: null,
              ProductId: req.params.product_id,
              viewCount: 0
            }
          }).spread((pageView, created) => {
            return pageView.update({
              viewCount: (pageView.viewCount || 1) + 1
            }).then(pageView => {
              return callback({ status: 'success', message: '取得特定產品成功', content: product, currentUser: currentUser })
            }).catch(err => {
              return callback({ status: 'error', message: '增加商品瀏覽紀錄失敗', content: err })
            })
          }).catch(err => {
            return callback({ status: 'error', message: '取得特定產品失敗', content: err })
          })
        }
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '取得特定產品失敗', content: err })
    }
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
          ProductId: req.params.product_id,
          dataStatus: 1
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
  },

  deleteReview: (req, res, callback) => {
    try {
      return Review.findOne({
        where: {
          id: req.params.review_id,
          UserId: req.user.id,
          ProductId: req.params.product_id,
          dataStatus: 1
        }
      }).then(review => {
        review.update({
          dataStatus: 0
        }).then(review => {
          return callback({ status: 'success', message: '使用者移除商品評論成功' })
        }).catch(err => {
          return callback({ status: 'error', message: '使用者移除商品評論失敗', content: err })
        })
      }).catch(err => {
        return callback({ status: 'error', message: '找不到該評論', content: err })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '使用者移除商品評論失敗', content: err })
    }
  },

  getCategories: (req, res, callback) => {
    try {
      return Category.findAll({
        include: [Product]
      }).then(categories => {
        return callback({ status: 'success', message: '取得分類資料成功', content: categories })
      }).catch(err => {
        return callback({ status: 'error', message: '取得分類資料失敗' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '取得分類資料失敗' })
    }
  }
}

module.exports = productService  