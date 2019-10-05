const express = require('express')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const helpers = require('./_helpers')
const passport = require('./config/passport')
const cors = require('cors')
const db = require('./models')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port ${port}!`)
})

require('./routes/index')(app)
module.exports = app
