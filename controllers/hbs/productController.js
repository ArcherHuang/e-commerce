const productService = require('../../services/productService.js')
const userService = require('../../services/userService.js')
// const db = require('../../models')
// const { Carousel, Category, User, Product, Like, Order, OrderItem, Review, PageView } = db

const productController = {

  getProducts: (req, res) => {
    productService.getProducts(req, res, (data) => {
        if (data['status'] === 'success') {
          req.flash('success_messages', data['message'])
          const keyword = req.query.keyword || ''

          return res.render('index', {
            products: data.content,
            carousels: data.carousels,
            categories: data.categories,
            keyword: keyword
          })
        } else {
          req.flash('error_messages', data['message'])
          return  res.redirect('back')
        }
      })
  },

  getShop: (req, res) => {
    productService.getProducts(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          req.flash('success_messages', data['message'])

          const page = Number(req.query.page) || 1
          const category_id = Number(req.query.category_id) || ''
          const keyword = req.query.keyword || ''

          // if (data.currentUser[0]) {
          //   const temp = data.currentUser[0].dataValues
          //   const setUser = {
          //     id: temp.id,
          //     name: temp.name,
          //     role: temp.role,
          //     isValid: temp.isValid,
          //     Reviews: temp.Reviews,
          //     productLiked: temp.productLiked
          //   }
          //   const productLiked = temp.productLiked.map(r => ({
          //     id: r.dataValues.id
          //   })) || []

          //   //console.log('----------', data.content)
          //   const productsData = data.content.map(r => ({
          //     ...r.dataValues
          //   }))
          //   //console.log('----------', productsData)

          //   let filterProducts = []

          //   productsData.forEach(p => {
          //     productLiked.forEach(liked => {
          //       if (p.id === liked.id) {
          //         p = {
          //           ...p,
          //           isliked: true
          //         } 
          //       } else {
          //         p = {
          //           ...p,
          //           isliked: false
          //         }
          //       }
          //     })
          //     filterProducts.push(p)
          //   })

          //   return res.render('shop', {
          //     products: filterProducts,
          //     setUser: setUser,
          //     categories: data.categories,
          //     category_id: category_id,
          //     page: page,
          //     totalPages: data.totalPages,
          //     prev: data.prev,
          //     next: data.next,
          //     keyword: keyword
          //   })
          // }
    
          return res.render('shop', {
            products: data.content,
            categories: data.categories,
            category_id: category_id,
            page: page,
            totalPages: data.totalPages,
            prev: data.prev,
            next: data.next,
            keyword: keyword
          })
        } else {
          return req.flash('error_messages', data['message'])
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect('back')
      }
    })
  },

  getProduct: (req, res, next) => {
    productService.getProduct(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          req.flash('success_messages', data['message'])
          return res.render('productDetail', {
            product: data.content
          })
        } else {
          return req.flash('error_messages', data['message'])
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect('back')
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