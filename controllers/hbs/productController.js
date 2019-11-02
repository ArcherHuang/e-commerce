const productService = require('../../services/productService.js')

const productController = {

  getProducts: (req, res) => {
    productService.getProducts(req, res, (data) => {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        console.log(`1_req_user_req_user_req_user_req_user: ${req.user}`)
        const num = 12
        const range = data.content.length - num
        const startNum = Math.floor(Math.random() * range) + 1
        const randomProducts = data.content.slice(startNum, startNum + num)

        return res.render('index', {
          products: data.content, 
          randomProducts: randomProducts,
          carousels: data.carousels, 
          categories: data.categories
        })
      } else {
        return req.flash('error_messages', data['message'])
      }
    })
  },
  getShop: (req, res) => {
    productService.getProducts(req, res, (data) => {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        console.log(req.user)
        console.log('123')

        return res.render('shop', {
          products: data.content, 
          randomProducts: randomProducts,
          carousels: data.carousels, 
          categories: data.categories
        })
      } else {
        return req.flash('error_messages', data['message'])
      }
    })
  },

}

module.exports = productController