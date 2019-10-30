let routes = require('./routes')
let apis = require('./apis')

module.exports = (app) => {

  // app.get('/', (req, res) => res.send('Hello World!'))
  app.use('/', routes)
  app.use('/api', apis)

}