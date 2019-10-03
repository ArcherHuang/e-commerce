
const userController = require('../controllers/userController.js')
const forgetPasswordController = require('../controllers/forgetPasswordController.js')

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

}
