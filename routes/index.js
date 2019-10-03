
const userController = require('../controllers/userController.js')

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

  // app.get('/', authenticated, (req, res) => res.redirect('/tweets'))
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

  app.get('/logout', userController.logout)

}
