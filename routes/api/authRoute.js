const express = require('express')
const router = express.Router()
const passport = require('passport')

const accountController = require('../../controllers/api/accountController')

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
router.get('/facebook/callback', accountController.getFacebookCallback)

module.exports = router