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
        console.log('----------------req.user----------------------',req.user)

        return res.render('shop', {
          products: data.content
        })
      } else {
        return req.flash('error_messages', data['message'])
      }
    })
  },

  getProduct: (req, res) => {
    productService.getProduct(req, res, (data) => {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        console.log(req.user)
        console.log('123')

        return res.render('productDetail', {
          product: data.content
        })
      } else {
        return req.flash('error_messages', data['message'])
      }
    })
  },

  unlikeProduct: async (req, res) => {
    await productService.unlikeProduct(req, res, (data) => {
      try {
        if (data['status'] == 'success') {
          req.flash('success_messages', "成功將商品移出 wishlist")
          res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "無法將商品移出 wishlist")
        res.redirect('back')
      }
    })
  }
}

module.exports = productController