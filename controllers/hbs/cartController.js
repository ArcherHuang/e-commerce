const cartService = require('../../services/cartService.js')

const cartController = {

  postCart: async (req, res) => {
    await cartService.postCart(req, res, (data) => {
      try {
        if (data['status'] == 'success') {
          req.flash('success_messages', "成功將商品加入購物車")
          res.redirect('back')
        } else {
          req.flash('error_messages', data['message'])
          res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "將商品加入購物車失敗")
        res.redirect('back')
      }
    })
  },

  getCart: async (req, res) => {
    await cartService.getCart(req, res, (data) => {
      try {
        return res.render('carts', { cart: data.cart })
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect('back')
      }
    })
  },

  addCartItem: async (req, res) => {
    await cartService.addCartItem(req, res, (data) => {
      try {
        req.flash('success_messages', data['message'])
        res.redirect('/carts')
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect('back')
      }
    })
  },

  subCartItem: async (req, res) => {
    await cartService.subCartItem(req, res, (data) => {
      try {
        req.flash('success_messages', data['message'])
        res.redirect('/carts')
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect('back')
      }
    })
  },

  deleteCartItem: async (req, res) => {
    await cartService.deleteCartItem(req, res, async (data) => {
      try {
        req.flash('success_messages', "成功將商品移出購物車")
        await cartService.checkTotalPrice(req.params.cartItem_id)
        return res.redirect('/carts')
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect('back')
      }
    })
  },

}

module.exports = cartController