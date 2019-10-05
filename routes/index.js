const { ensureAuthenticated, isAuthAdmin, getUser } = require('../config/auth')

const adminRoute = require('./adminRoute')
const userRoute = require('./userRoute')

module.exports = (app, passport) => {

  app.get('/', ensureAuthenticated, getUser, (req, res) => res.send('Hello World!'))
  app.use('/admin', ensureAuthenticated, getUser, isAuthAdmin, adminRoute)
  app.use('/accounts', userRoute)

}
