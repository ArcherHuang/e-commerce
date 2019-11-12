const productService = require('../../services/productService.js')
const userService = require('../../services/userService.js')

const productController = {

  getProducts: (req, res) => {
    productService.getProducts(req, res, (data) => {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        const keyword = req.query.keyword || ''

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

          const filterProducts = productsData.map(p => ({
            ...p,
            isLiked: productLiked.map(r => r.id === p.id)

          }))

          return res.render('shop', {
            products: filterProducts,
            setUser: setUser,
            categories: data.categories,
            keyword: keyword
          })
        }

        return res.render('index', {
          products: data.content,
          categories: data.categories,
          keyword: keyword
        })
      } else {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
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

            let filterProducts = []

            productsData.forEach(p => {
              productLiked.forEach(liked => {
                if (p.id === liked.id) {
                  p = {
                    ...p,
                    isLiked: true
                  }
                } else {
                  p = {
                    ...p,
                    isLiked: false
                  }
                }
              })
              filterProducts.push(p)
            })
            // console.log('--------------','page:', page, 'totalPages:', data.totalPages,'keyword:', keyword)
            return res.render('shop', {
              products: filterProducts,
              setUser: setUser,
              categories: data.categories,
              category_id: category_id,
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

          return res.render('productDetail', {
            product: data.content,
            reviews: reviews
          })
        } else {
          req.flash('error_messages', data['message'])
          return res.redirect('/')
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