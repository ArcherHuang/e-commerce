const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'https://ajashop.co/',
    failureRedirect: 'https://ajashop.co/accounts/signin',
  })
)

module.exports = router