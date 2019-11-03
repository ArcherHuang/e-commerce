const express = require('express')
const router = express.Router()

const userController = require('../../controllers/hbs/admin/userController')

// User
router.get('/users', userController.editUsers)
router.put('/users/:user_id', userController.putUsers)

module.exports = router