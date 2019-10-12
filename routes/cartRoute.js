const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')

router.get('/', cartController.getCart)
router.post('/', cartController.postCart)
router.post('/:cartItem_id/add', cartController.addCartItem)

module.exports = router