const categoryService = require('../services/categoryService.js')

let categoryController = {

  // GET http://localhost:3000/admin/categories
  getCategories: (req, res, callback) => {

    categoryService.getCategories(req, res, (data) => {

      // return res.json({ status: 'success', message: data['message'] })
      return res.render('admin/categories', {
        categories: data['categories']
      })

    })

  },

  // POST http://localhost:3000/admin/categories
  // name
  postCategory: (req, res) => {

    categoryService.postCategory(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        // return res.json({ status: 'error', message: data['message'] })
        return res.redirect('back')
      } else if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        // return res.json({ status: 'success', message: data['message'] })
        return res.redirect('/admin/categories')
      }
    })


  },

  // PUT http://localhost:3000/admin/categories/6
  // name
  putCategory: (req, res) => {

    categoryService.putCategory(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        // return res.json({ status: 'error', message: data['message'] })
        return res.redirect('back')
      } else if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        // return res.json({ status: 'success', message: data['message'] })
        return res.redirect('/admin/categories')
      }
    })

  },

  // DELETE http://localhost:3000/admin/categories/6
  deleteCategory: (req, res) => {

    categoryService.deleteCategory(req, res, (data) => {

      // return res.json({ status: 'success', message: data['message'] })
      return res.redirect('/admin/categories')

    })

  },

}

module.exports = categoryController