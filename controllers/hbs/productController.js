const productService = require('../../services/productService.js')
const userService = require('../../services/userService.js')

const productController = {

  getProducts: (req, res) => {
    productService.getProducts(req, res, (data) => {
        if (data['status'] === 'success') {
          req.flash('success_messages', data['message'])
          const keyword = req.query.keyword || ''
          const cartItemNum = data.cart.items.length || 0
          
          // console.log('=========================')
          // if (data.cart.items[0]) {
          //   console.log(data.cart.items[0].dataValues.CartItem)
          //   console.log(cartItemNum)
          // }


          if (data.currentUser[0]) {
            const temp = data.currentUser[0].dataValues
            const setUser = {
              id: temp.id,
              name: temp.name,
              role: temp.role,
              isValid: temp.isValid,
              Reviews: temp.Reviews,
              productLiked: temp.productLiked
            }
            const productLiked = temp.productLiked.map(r => ({
              id: r.dataValues.id
            })) || []

            //console.log('----------', data.content)
            const productsData = data.content.map(r => ({
              ...r.dataValues
            }))
            //console.log('----------', productsData)

            const filterProducts =  productsData.map(p => ({
              ...p,
              isLiked: productLiked.map(r => r.id).include(p.id)
            }))

            return res.render('shop', {
              products: filterProducts,
              setUser: setUser,
              categories: data.categories,
              barCart: data.cart,
              cartItemNum: cartItemNum,
              barTotalPrice: data.totalPrice,
              keyword: keyword
            })
          }

          return res.render('index', {
            products: data.content,
            categories: data.categories,
            barCart: data.cart,
            cartItemNum: cartItemNum,
            barTotalPrice: data.totalPrice,
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
          const category_id = Number(req.query.category_id) || 0
          const keyword = req.query.keyword || ''
          const cartItemNum = data.cart.items.length || 0

          if (data.currentUser[0]) {
            const temp = data.currentUser[0].dataValues
            const setUser = {
              id: temp.id,
              name: temp.name,
              role: temp.role,
              isValid: temp.isValid,
              Reviews: temp.Reviews,
              productLiked: temp.productLiked
            }
            const productLiked = temp.productLiked.map(r => ({
              id: r.dataValues.id
            })) || []

            //console.log('----------', data.content)
            const productsData = data.content.map(r => ({
              ...r.dataValues
            }))
            //console.log('----------', productsData)

            const filterProducts =  productsData.map(p => ({
              ...p,
              isLiked: productLiked.map(r => r.id).include(p.id)
            }))
           
            return res.render('shop', {
              products: filterProducts,
              setUser: setUser,
              categories: data.categories,
              category_id: category_id,
              barCart: data.cart,
              cartItemNum: cartItemNum,
              barTotalPrice: data.totalPrice,
              page: page,
              totalPages: data.totalPages,
              prev: data.prev,
              next: data.next,
              keyword: keyword
            })
          }
    
          return res.render('shop', {
            products: data.content,
            categories: data.categories,
            barCart: data.cart,
            cartItemNum: cartItemNum,
            barTotalPrice: data.totalPrice,
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

          const cartItemNum = data.cart.items.length || 0

          let reviews
          // 取出 reviewer 的 user name
          reviews = data.content.Reviews.map(r => ({
            id: r.id,
            review: r.review,
            createdAt: r.createdAt,
            UserId: r.UserId,
            ProductId: r.ProductId,
            dataStatus: r.dataStatus,
            userName: r.User.name
          }))
          console.log( data)
          if (data.currentUser['status'] === 'success') {
              const temp = data.currentUser.content
              const productLiked = temp.productLiked.map(r => ({
                id: r.id
              }))
              console.log(productLiked)
              const product = {
                id: data.content.dataValues.id,
                name: data.content.dataValues.id,
                description: data.content.dataValues.description,
                image: data.content.dataValues.image,
                price:  data.content.dataValues.price,
                recommendedPrice: data.content.dataValues.recommendedPrice,
                inventory: data.content.dataValues.inventory,
                length: data.content.dataValues.length,
                width: data.content.dataValues.width,
                height: data.content.dataValues.height,
                weight: data.content.dataValues.weight,
                CategoryId: data.content.dataValues.CategoryId,
                isLiked: productLiked.map(r => r.id).includes(data.content.dataValues.id),
                dataStatus: data.content.dataValues.dataStatus,
                Category: data.content.dataValues.Category
              }
  
              return res.render('productDetail', {
                product: product,
                barCart: data.cart,
                barTotalPrice: data.totalPrice,
                cartItemNum: cartItemNum,
                reviews: reviews
              })
          }

          return res.render('productDetail', {
            product:  data.content,
            barCart: data.cart, 
            barTotalPrice: data.totalPrice,
            cartItemNum: cartItemNum,
            reviews: reviews
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


  likeProduct: async (req, res) => {
    await productService.likeProduct(req, res, (data) => {
      try {
        if (data['status'] == 'success') {
          req.flash('success_messages', "成功收藏商品")
          res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "收藏商品失敗")
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
  },

  deleteReview: async (req, res) => {
    await productService.deleteReview(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          req.flash('success_messages', "成功刪除評論")
          res.redirect('back')
        } else {
          req.flash('error_messages', "刪除評論失敗")
          res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "刪除評論失敗")
        res.redirect('back')
      }
    })
  },

  getReviewEditPage: async (req, res) => {
    await userService.getUserReviews(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          let reviews = data.content
          let targetId = req.params.review_id || null
          res.render('accountsReviews', { reviews: reviews, targetId: targetId })
        } else {
          res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect('back')
      }
    })
  },

  putReview: async (req, res) => {
    await productService.putReview(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          req.flash('success_messages', "成功更新評論")
          res.redirect('/accounts/reviews')
        } else {
          req.flash('error_messages', "更新評論失敗")
          res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "更新評論失敗")
        res.redirect('back')
      }
    })
  },

  postReview: async (req, res) => {
    await productService.postReview(req, res, (data) => {
      try {
        if (data['status'] == 'success') {
          req.flash('success_messages', data['message'])
          res.redirect(`/products/${req.params.product_id}/#des-details3`)
        } else {
          req.flash('error_messages', data['message'])
          res.redirect(`/products/${req.params.product_id}/#des-details3`)
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect(`/products/${req.params.product_id}/#des-details3`)
      }
    })
  }
}

module.exports = productController