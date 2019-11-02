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

}

module.exports = cartController