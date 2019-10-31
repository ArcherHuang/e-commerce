const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const swaggerDocument = require('./swagger/swaggerDoc')
const session = require('express-session')
const CronJob = require('cron').CronJob

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cronService = require('./services/cronService')

const helpers = require('./_helpers')
// const passport = require('./config/passport')
const passport = require('passport')
const cors = require('cors')
const db = require('./models')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

// API 文件
swaggerDocument(app)

app.engine(
  '.hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./config/handlebars-helpers')
  })
)

app.set('view engine', '.hbs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
  secret: 'helloworld',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1800000, //Cookie 30 分鐘後失效
    // secure: true //只允許 HTTPS/SSL 訪問
  },
}))


app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

//The cron jobs
cronService.sendBirthdayCoupon()
cronService.deleteInvalidUser()
cronService.deleteExpiredCoupon()
cronService.deleteExpiredCart()
cronService.deleteExpiredOrderItems()

app.use(methodOverride('_method'))

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port ${port}!`)
})

require('./routes/index')(app)
module.exports = app
