const { ensureAuthenticated, isAuthAdmin, isAuthUser, getUser } = require('../config/auth')

const adminRoute = require('./adminRoute')
const accountRoute = require('./accountRoute')
const cartRoute = require('./cartRoute')
const productRoute = require('./productRoute')
const orderRoute = require('./orderRoute')

module.exports = (app, passport) => {

  // app.get('/', ensureAuthenticated, getUser, (req, res) => res.send('Hello World!'))
  app.use('/admin', ensureAuthenticated, getUser, isAuthAdmin, adminRoute)
  app.use('/accounts', getUser, accountRoute)
  app.use('/carts', cartRoute)
  app.use('/orders', orderRoute)
  app.use('/products', productRoute)

}
