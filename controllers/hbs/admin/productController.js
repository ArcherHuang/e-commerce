const productService = require('../../../services/admin/productService')
const categoryService = require('../../../services/admin/categoryService')

const productController = {

  responseMessageAction: (req, res, data, successAction, errorAction) => {
    try {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        res.redirect(successAction)
      } else {
        req.flash('error_messages', data['message'])
        return res.redirect(errorAction)
      }
    }
    catch (err) {
      console.log(`Err: ${err}`)
      req.flash('error_messages', "Product 功能操作失敗")
      res.redirect('back')
    }
  },

  getProducts: (req, res) => {
    productService.getProducts(req, res, (data) => {
      return res.render('admin/products', {
        [data['key']]: data['content'],
        categories: data['categories']
      })
    })
  },

  getProduct: (req, res) => {
    productService.getProduct(req, res, (data) => {
      if (data['status'] === 'success') {
        let product = data.content
        return res.render('admin/product', { product: product })
      } else {
        return res.redirect('back')
      }
    })
  },

  postProduct: (req, res) => {
    console.log(`postProduct_____file_image: ${req.file}`)
    productService.postProduct(req, res, (data) => {
      productController.responseMessageAction(req, res, data, '/admin/products', 'back')
    })
  },

  putProduct: (req, res) => {
    productService.putProduct(req, res, (data) => {
      productController.responseMessageAction(req, res, data, '/admin/products', 'back')
    })
  },

  deleteProduct: (req, res) => {
    productService.deleteProduct(req, res, (data) => {
      productController.responseMessageAction(req, res, data, 'back', 'back')
    })
  },

  getProductEditPage: (req, res) => {
    try {
      if (req.url === '/products/create') {
        console.log(`==== CREATE NEW ====`)
        categoryService.getCategories(req, res, (data) => {
          if (data['status'] === 'success') {
            let categories = data.content
            return res.render('admin/productEdit', { categories: categories })
          } else {
            return res.redirect('back')
          }
        })
      } else {
        console.log(`==== EDIT OLD ====`)
        productService.getProduct(req, res, (data) => {
          if (data['status'] === 'success') {
            let product = data.content
            let categories = data.categories
            return res.render('admin/productEdit', { product: product, categories: categories })
          } else {
            return res.redirect('back')
          }
        })
      }
    }
    catch (err) {
      console.log(`Err: ${err}`)
      return res.redirect('back')
    }
  }

}

module.exports = productController