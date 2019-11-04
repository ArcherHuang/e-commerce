const express = require('express')
const router = express.Router()

const userController = require('../../controllers/hbs/admin/userController')
const categoryController = require('../../controllers/hbs/admin/categoryController')

// User
router.get('/users', userController.editUsers)
router.put('/users/:user_id', userController.putUsers)

// Category
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategory)
router.get('/categories/:category_id', categoryController.getCategories)
router.put('/categories/:category_id', categoryController.putCategory)
router.delete('/categories/:category_id', categoryController.deleteCategory)

module.exports = router