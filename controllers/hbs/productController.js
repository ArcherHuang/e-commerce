const productService = require('../../services/productService.js')

const productController = {

  getProducts: (req, res) => {
    console.log(`getProductsgetProducts: ${req.user}`)
    return res.render('products')
  },

}

module.exports = productController