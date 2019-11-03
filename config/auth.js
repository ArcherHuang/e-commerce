const helper = require('../_helpers')
const passport = require('passport')

module.exports = {

  ensureAuthenticated: (req, res, next) => {
    if (helper.ensureAuthenticated()) {
      return next()
    }
    return passport.authenticate('jwt', { session: false })(req, res, next)
  },

  getUser: (req, res, next) => {
    req.user = helper.getUser(req)
    next()
  },

  isAuthAdmin: (req, res, next) => {
    if (!req.user) return res.json({ status: 'error', message: 'Permission denied' })
    if (req.user.role !== 'admin') return res.json({ status: 'error', message: 'Permission denied' })
    next()
  },

  isAuthUser: (req, res, next) => {
    if (!req.user) return res.json({ status: 'error', message: 'Permission denied' })
    if (req.user.role == 'admin' || req.user.role == 'user') {
      next()
    } else {
      return res.json({ status: 'error', message: 'Permission denied' })
    }

  },

  authenticatedAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.role == 'admin') { return next() }
      return res.redirect('/products/main')
    }
    res.redirect('/accounts/signin')
  }
}