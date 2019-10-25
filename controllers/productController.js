const productService = require('../services/productService.js')

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

  postReview: (req, res) => {
    productService.postReview(req, res, (data) => {
      return res.json(data)
    })
  },

  putReview: (req, res) => {
    productService.putReview(req, res, (data) => {
      return res.json(data)
    })
  },

  deleteReview: (req, res) => {
    productService.deleteReview(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = productController