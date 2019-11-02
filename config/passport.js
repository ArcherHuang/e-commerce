const passport = require('passport')
const passportJWT = require('passport-jwt')
const passportFB = require('passport-facebook')
const LocalStrategy = require('passport-local')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const FacebookStrategy = passportFB.Strategy
const bcrypt = require('bcrypt-nodejs')

const db = require('../models')
const User = db.User

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {

  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, (req, username, password, cb) => {
      User.findOne({
        where: { email: username }
      })
        .then(user => {
          if (!user)
            return cb(null, false, req.flash('error_messages', 'Wrong email or password'))

          if (!bcrypt.compareSync(password, user.password))
            return cb(null, false, req.flash('error_messages', 'Wrong email or password'))

          return cb(null, user)
        })
    })
  )

  passport.use(
    new FacebookStrategy({
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      console.log('Profile: ', profile)
      console.log('Done: ', done)
      User.findOne({
        where: {
          email: profile._json.email
        }
      }).then(user => {
        if (!user) {
          let randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(randomPassword, salt, null, (err, hash) => {
              return User.create({
                name: profile._json.name,
                email: profile._json.email,
                role: user,
                password: hash
              }).then(user => {
                return done(null, user)
              }).catch(err => {
                console.log('Err: ', err)
              })
            })
          )
        } else {
          return done(null, user)
        }
      })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, cb) => {
    User.findByPk(id).then(user => {
      return cb(null, user)
    })
  })

  passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id)
      if (!user) return done(null, false)
      return done(null, user)
    } catch (error) {
      done(error, false)
    }
  }))
}

