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
        return res.redirect('back')
      }
    })
  },

  getCart: async (req, res) => {
    // 若使用者未登入
    if (!req.user) {
      req.session.path = 'carts'
    }

    await cartService.getCart(req, res, (data) => {
      try {
        return res.render('carts', { cart: data.cart, coupon: data.coupon })
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect('back')
      }
    })
  },

  addCartItem: async (req, res) => {
    await cartService.addCartItem(req, res, async (data) => {
      try {
        await cartService.checkTotalPrice(req.session.cartId)
        req.flash('success_messages', data['message'])
        return res.redirect('/carts')
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect('back')
      }
    })
  },

  subCartItem: async (req, res) => {
    await cartService.subCartItem(req, res, async (data) => {
      try {
        await cartService.checkTotalPrice(req.session.cartId)
        req.flash('success_messages', data['message'])
        return res.redirect('/carts')
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect('back')
      }
    })
  },

  deleteCartItem: async (req, res) => {
    await cartService.deleteCartItem(req, res, async (data) => {
      try {
        await cartService.checkTotalPrice(req.session.cartId)
        req.flash('success_messages', "成功將商品移出購物車")
        return res.redirect('/carts')
      }
      catch (err) {
        console.log(`Err: ${err}`)
        return res.redirect('back')
      }
    })
  },

  addCoupon: async (req, res) => {
    await cartService.addCoupon(req, res, async (data) => {
      try {
        await cartService.checkTotalPrice(req.session.cartId)
        req.flash('success_messages', data['message'])
        return res.redirect('back')
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "加入 coupon 失敗")
        return res.redirect('back')
      }
    })
  },

  removeCoupon: async (req, res) => {
    await cartService.removeCoupon(req, res, async (data) => {
      try {
        await cartService.checkTotalPrice(req.session.cartId)
        req.flash('success_messages', data['message'])
        return res.redirect('back')
      }
      catch (err) {
        console.log(`Err: ${err}`)
        req.flash('error_messages', "移除 coupon 失敗")
        return res.redirect('back')
      }
    })
  },
}

module.exports = cartController