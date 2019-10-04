const adminService = require('../services/adminService.js')

const adminController = {

  getProducts: (req, res) => {

    return res.render('admin/products')

  },

  editUsers: (req, res) => {

    adminService.editUsers(req, res, (data) => {
      return res.render('admin/users', {
        users: data['users']
      })
    })

  },

  putUsers: (req, res) => {

    adminService.putUsers(req, res, (data) => {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        return res.redirect('/admin/users')
      }

    })

  }

}

module.exports = adminController