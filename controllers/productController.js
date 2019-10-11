const productService = require('../services/productService.js')

const productController = {

  likeProduct: (req, res) => {
    productService.likeProduct(req, res, (data) => {
      return res.json(data)
    })
  },

  unlikeProduct: (req, res) => {
    productService.unlikeProduct(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = productController