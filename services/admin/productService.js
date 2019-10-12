const validator = require('validator')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const db = require('../../models')
const { Product, Category, Carousel } = db

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const productService = {

  checkProductField: (data) => {

    const name = data.name === undefined ? '' : data.name.trim()
    const description = data.description === undefined ? '' : data.description.trim()
    const price = data.price === undefined ? '' : data.price.trim()
    const recommended_price = data.recommended_price === undefined ? '' : data.recommended_price.trim()
    const inventory = data.inventory === undefined ? '' : data.inventory.trim()
    const length = data.length === undefined ? '' : data.length.trim()
    const width = data.width === undefined ? '' : data.width.trim()
    const height = data.height === undefined ? '' : data.height.trim()
    const weight = data.weight === undefined ? '' : data.weight.trim()
    const category_id = data.category_id === undefined ? '' : data.category_id.trim()

    if (name.length == 0) return ({ status: 'error', message: '請輸入 Product 的 name 資訊' })
    if (description.length == 0) return ({ status: 'error', message: '請輸入 Product 的 description 資訊' })
    if (price.length == 0) return ({ status: 'error', message: '請輸入 Product 的 price 資訊' })
    if (recommended_price.length == 0) return ({ status: 'error', message: '請輸入 Product 的 recommended_price 資訊' })
    if (inventory.length == 0) return ({ status: 'error', message: '請輸入 Product 的 inventory 資訊' })
    if (length.length == 0) return ({ status: 'error', message: '請輸入 Product 的 length 資訊' })
    if (width.length == 0) return ({ status: 'error', message: '請輸入 Product 的 width 資訊' })
    if (height.length == 0) return ({ status: 'error', message: '請輸入 Product 的 height 資訊' })
    if (weight.length == 0) return ({ status: 'error', message: '請輸入 Product 的 weight 資訊' })
    if (category_id.length == 0) return ({ status: 'error', message: '請輸入 Product 的 category id 資訊' })

    if (!validator.isInt(price, { min: 1 })) return ({ status: 'error', message: 'Product 的 price 請輸入至少大於 1' })
    if (!validator.isInt(recommended_price, { min: 1 })) return ({ status: 'error', message: 'Product 的 recommended price 請輸入至少大於 1' })
    if (!validator.isInt(inventory, { min: 0 })) return ({ status: 'error', message: 'Product 的 inventory 請輸入至少大於 0' })
    if (!validator.isInt(length, { min: 1 })) return ({ status: 'error', message: 'Product 的 length 請輸入至少大於 1' })
    if (!validator.isInt(width, { min: 1 })) return ({ status: 'error', message: 'Product 的 width 請輸入至少大於 1' })
    if (!validator.isInt(height, { min: 1 })) return ({ status: 'error', message: 'Product 的 height 請輸入至少大於 1' })
    if (!validator.isInt(weight, { min: 1 })) return ({ status: 'error', message: 'Product 的 weight 請輸入至少大於 1' })
    if (!validator.isInt(category_id, { min: 1 })) return ({ status: 'error', message: 'Product 的 category id 請輸入至少大於 1' })

    return ({ status: 'success', message: 'Product 欄位確認正確' })
  },

  getProducts: async (req, res, callback) => {

    let carousels = await Carousel.findAll()

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
          return callback({ status: 'success', message: '取得搜尋產品清單成功', content: products, carousels: carousels })
        } else {
          return Product.findAll({ include: [Category] }).then(products => {
            return callback({ status: 'success', message: '該搜尋沒有產品，取得所有產品清單成功', content: products, carousels: carousels })
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
          return callback({ status: 'success', message: '取得搜尋產品清單成功', content: products, carousels: carousels })
        } else {
          return Product.findAll({ include: [Category] }).then(products => {
            return callback({ status: 'success', message: '該搜尋沒有產品，取得所有產品清單成功', content: products, carousels: carousels })
          })
        }
      })
    } else {
      return Product.findAll({ include: [Category] }).then(products => {
        return callback({ status: 'success', message: '取得所有產品清單成功', content: products, carousels: carousels })
      })
    }
  },

  getProduct: (req, res, callback) => {

    return Product.findByPk(req.params.product_id, { include: [Category] }).then(product => {
      return callback({ status: 'success', message: '取得特定產品成功', content: product })
    })

  },

  postProduct: (req, res, callback) => {

    const name = req.body.name === undefined ? '' : req.body.name.trim()
    const description = req.body.description === undefined ? '' : req.body.description.trim()
    const price = req.body.price === undefined ? '' : req.body.price.trim()
    const recommendedPrice = req.body.recommended_price === undefined ? '' : req.body.recommended_price.trim()
    const inventory = req.body.inventory === undefined ? '' : req.body.inventory.trim()
    const length = req.body.length === undefined ? '' : req.body.length.trim()
    const width = req.body.width === undefined ? '' : req.body.width.trim()
    const height = req.body.height === undefined ? '' : req.body.height.trim()
    const weight = req.body.weight === undefined ? '' : req.body.weight.trim()

    const productFieldCheckResult = productService.checkProductField(req.body)
    if (productFieldCheckResult.status === 'success') {

      const { file } = req // equal to const file = req.file
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, (err, img) => {
          return Product.create({
            name,
            description,
            price,
            recommendedPrice,
            inventory,
            image: file ? img.data.link : null,
            length,
            width,
            height,
            weight,
            CategoryId: req.body.category_id
          }).then((product) => {
            callback({ status: 'success', message: '商品資料建立成功' })
          })
        })
      } else {
        return Product.create({
          name,
          description,
          price,
          recommendedPrice,
          inventory,
          length,
          width,
          height,
          weight,
          CategoryId: req.body.category_id
        })
          .then((product) => {
            callback({ status: 'success', message: '商品資料建立成功' })
          })
      }

    } else {
      return callback(productFieldCheckResult)
    }

  },

  putProduct: (req, res, callback) => {

    const name = req.body.name === undefined ? '' : req.body.name.trim()
    const description = req.body.description === undefined ? '' : req.body.description.trim()
    const price = req.body.price === undefined ? '' : req.body.price.trim()
    const recommendedPrice = req.body.recommended_price === undefined ? '' : req.body.recommended_price.trim()
    const inventory = req.body.inventory === undefined ? '' : req.body.inventory.trim()
    const length = req.body.length === undefined ? '' : req.body.length.trim()
    const width = req.body.width === undefined ? '' : req.body.width.trim()
    const height = req.body.height === undefined ? '' : req.body.height.trim()
    const weight = req.body.weight === undefined ? '' : req.body.weight.trim()

    const productFieldCheckResult = productService.checkProductField(req.body)
    if (productFieldCheckResult.status === 'success') {
      const { file } = req
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, (err, img) => {
          return Product.findByPk(req.params.product_id)
            .then((product) => {
              product.update({
                name,
                description,
                price,
                recommendedPrice,
                inventory,
                image: file ? img.data.link : null,
                length,
                width,
                height,
                weight,
                CategoryId: req.body.category_id
              }).then((product) => {
                callback({ status: 'success', message: '商品更新成功' })
              })
            })
        })
      } else {
        return Product.findByPk(req.params.product_id)
          .then((product) => {
            product.update({
              name,
              description,
              price,
              recommendedPrice,
              inventory,
              length,
              width,
              height,
              weight,
              CategoryId: req.body.category_id
            }).then((product) => {
              callback({ status: 'success', message: '商品更新成功' })
            })
          })
      }
    } else {
      return callback(productFieldCheckResult)
    }

  },

  deleteProduct: (req, res, callback) => {

    Product.findByPk(req.params.product_id)
      .then((product) => {
        if (product) {
          product.update({
            dataStatus: 0
          })
            .then((product) => {
              callback({ status: 'success', message: 'Product 已刪除成功' })
            })
        } else {
          callback({ status: 'fail', message: '查無此 Product 存在' })
        }

      })

  },


}

module.exports = productService  