
const userController = require('../controllers/userController.js')
const forgetPasswordController = require('../controllers/forgetPasswordController.js')
const categoryController = require('../controllers/categoryController.js')
const adminController = require('../controllers/adminController.js')
const adminCouponController = require('../controllers/adminCouponController.js')

const helpers = require('../_helpers')

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (helpers.ensureAuthenticated(req)) {
      return next()
    }
    return res.redirect('/signin')
  }

  const authenticatedAdmin = (req, res, next) => {
    if (helpers.ensureAuthenticated(req)) {
      if (req.user.role === 'admin') return next()
      return res.redirect('/')
    }
    res.redirect('/signin')
  }


  app.get('/', authenticated, userController.homePage)

  app.get('/signin', userController.signInPage)
  app.post(
    '/signin',
    passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }),
    userController.signIn
  )

  app.get('/signup', userController.signUpPage)
  app.post(
    '/signup',
    userController.signUp,
    passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }),
    userController.signIn
  )

  app.get('/reset-password', forgetPasswordController.forgotPasswordPage)
  app.get('/reset-password/:token', forgetPasswordController.getRedisKey)
  app.post('/reset-password', forgetPasswordController.setRedisKey)
  app.get('/modfiy-password', forgetPasswordController.modifyPasswordPage)
  app.put('/modfiy-password', forgetPasswordController.resetPassword)

  app.get('/logout', userController.logout)

  app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/products'))
  app.get('/admin/products', authenticatedAdmin, adminController.getProducts)

  // 商品分類
  app.post('/admin/categories', authenticatedAdmin, categoryController.postCategory)
  app.put('/admin/categories/:id', authenticatedAdmin, categoryController.putCategory)
  app.delete('/admin/categories/:id', authenticatedAdmin, categoryController.deleteCategory)
  app.get('/admin/categories', authenticatedAdmin, categoryController.getCategories)
  app.get('/admin/categories/:id', authenticatedAdmin, categoryController.getCategories)


  // User
  app.get('/admin/users', authenticatedAdmin, adminController.editUsers)
  app.put('/admin/users/:id', authenticatedAdmin, adminController.putUsers)

  // Coupon
  app.post('/admin/coupons', authenticatedAdmin, adminCouponController.postCoupon)
  app.put('/admin/coupons/:id', authenticatedAdmin, adminCouponController.putCoupon)
  app.delete('/admin/coupons/:id', authenticatedAdmin, adminCouponController.deleteCoupon)
  app.get('/admin/coupons', authenticatedAdmin, adminCouponController.getCoupons)
  app.get('/admin/coupons/:id', authenticatedAdmin, adminCouponController.getCoupons)

}
