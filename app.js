const express = require('express')
const bodyParser = require('body-parser')
const swaggerDocument = require('./swagger/swaggerDoc')
const session = require('express-session')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port ${port}!`)
})

require('./routes/index')(app)
module.exports = app
