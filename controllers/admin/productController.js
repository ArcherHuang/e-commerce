const productService = require('../../services/admin/productService')

const productController = {

  getProducts: (req, res) => {
    productService.getProducts(req, res, (data) => {
      return res.json(data)
    })
  },

  getProduct: (req, res) => {
    productService.getProduct(req, res, (data) => {
      return res.json(data)
    })
  },

  postProduct: (req, res, callback) => {
    productService.postProduct(req, res, (data) => {
      return res.json(data)
    })
  },

  putProduct: (req, res) => {
    productService.putProduct(req, res, (data) => {
      return res.json(data)
    })
  },

  deleteProduct: (req, res, callback) => {
    productService.deleteProduct(req, res, (data) => {
      return res.json(data)
    })
  },

}

module.exports = productController