const productService = require('../../services/productService.js')
const userService = require('../../services/userService.js')

const productController = {

  getProducts: (req, res) => {
    productService.getProducts(req, res, (data) => {
      try {

        if (data['status'] === 'success') {
          // 若使用者有登入
          if (req.user) {
            const temp = data.currentUser.content
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

            const productsData = data.content.map(r => ({
              ...r.dataValues
            }))

            let filterProducts = []

            productsData.forEach(p => {
              productLiked.every(liked => {
                if (p.id === liked.id) {
                  p = {
                    ...p,
                    isLiked: true
                  }
                  return false
                } else {
                  p = {
                    ...p,
                    isLiked: false
                  }
                  return true
                }
              })
              filterProducts.push(p)
            })

            return res.render('index', {
              products: filterProducts,
              setUser: setUser,
              categories: data.categories,
              category_id: data.category_id,
              page: data.page,
              totalPages: data.totalPages,
              prev: data.prev,
              next: data.next,
              keyword: data.keyword,
              success_messages: data['message']
            })
          }
          // 若使用者未登入
          return res.render('index', {
            products: data.content,
            categories: data.categories,
            category_id: data.category_id,
            page: data.page,
            totalPages: data.totalPages,
            prev: data.prev,
            next: data.next,
            keyword: data.keyword,
            success_messages: data['message']
          })
        } else {
          return req.flash('error_messages', data['message'])
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect('back')
      }
    })
  },

  getShop: (req, res) => {
    productService.getProducts(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          // 若使用者有登入
          if (req.user) {
            const temp = data.currentUser.content
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

            const productsData = data.content.map(r => ({
              ...r.dataValues
            }))

            let filterProducts = []

            productsData.forEach(p => {
              productLiked.every(liked => {
                if (p.id === liked.id) {
                  p = {
                    ...p,
                    isLiked: true
                  }
                  return false
                } else {
                  p = {
                    ...p,
                    isLiked: false
                  }
                  return true
                }
              })
              filterProducts.push(p)
            })

            req.flash('success_messages', data['message'])
            return res.render('shop', {
              products: filterProducts,
              setUser: setUser,
              categories: data.categories,
              category_id: data.category_id,
              page: data.page,
              totalPages: data.totalPages,
              prev: data.prev,
              next: data.next,
              keyword: data.keyword
            })
          }

          // 若使用者未登入
          return res.render('shop', {
            products: data.content,
            categories: data.categories,
            category_id: data.category_id,
            page: data.page,
            totalPages: data.totalPages,
            prev: data.prev,
            next: data.next,
            keyword: data.keyword
          })
        } else {
          return req.flash('error_messages', data['message'])
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect('back')
      }
    })
  },

  getProduct: (req, res, next) => {
    productService.getProduct(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          req.flash('success_messages', data['message'])

          let reviews
          let isLiked = false

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

          // 若使用者有登入
          if (req.user) {
            let user = data.currentUser.content
            const productLiked = user.productLiked.map(r => ({
              id: r.dataValues.id
            })) || []

            productLiked.forEach(p => {
              if (p.id === data.content.id) {
                isLiked = true
              }
            })
          }

          return res.render('productDetail', {
            product: data.content,
            reviews: reviews,
            isLiked: isLiked
          })

        } else {
          console.log('======== FALSE ========')
          req.flash('error_messages', data['message'])
          return res.redirect('/')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect('back')
      }
    })
  },

  likeProduct: async (req, res) => {
    await productService.likeProduct(req, res, (data) => {
      try {
        if (data['status'] == 'success') {
          req.flash('success_messages', "成功收藏商品")
          return res.redirect('back')
        } else {
          req.flash('error_messages', data['message'])
          return res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "收藏商品失敗")
        return res.redirect('back')
      }
    })
  },


  unlikeProduct: async (req, res) => {
    await productService.unlikeProduct(req, res, (data) => {
      try {
        if (data['status'] == 'success') {
          req.flash('success_messages', "成功將商品移出收藏")
          return res.redirect('back')
        } else {
          req.flash('error_messages', data['message'])
          return res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "無法將商品移出 wishlist")
        return res.redirect('back')
      }
    })
  },

  deleteReview: async (req, res) => {
    await productService.deleteReview(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          req.flash('success_messages', "成功刪除評論")
          return res.redirect('back')
        } else {
          req.flash('error_messages', "刪除評論失敗")
          return res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "刪除評論失敗")
        return res.redirect('back')
      }
    })
  },

  getReviewEditPage: async (req, res) => {
    await userService.getUserReviews(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          let reviews = data.content
          let targetId = req.params.review_id || null
          return res.render('accountsReviews', { reviews: reviews, targetId: targetId })
        } else {
          return res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect('back')
      }
    })
  },

  putReview: async (req, res) => {
    await productService.putReview(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          req.flash('success_messages', "成功更新評論")
          return res.redirect('/accounts/reviews')
        } else {
          req.flash('error_messages', "更新評論失敗")
          return res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "更新評論失敗")
        return res.redirect('back')
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
          return res.redirect(`/products/${req.params.product_id}/#des-details3`)
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect(`/products/${req.params.product_id}/#des-details3`)
      }
    })
  }
}

module.exports = productController