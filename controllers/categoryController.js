const categoryService = require('../services/categoryService.js')

let categoryController = {

  // GET http://localhost:3000/admin/categories
  getCategories: (req, res, callback) => {
    categoryService.getCategories(req, res, (data) => {
      return res.json(data)
    })
  },

  // POST http://localhost:3000/admin/categories
  // name
  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
      return res.json(data)
    })
  },

  // PUT http://localhost:3000/admin/categories/6
  // name
  putCategory: (req, res) => {
    categoryService.putCategory(req, res, (data) => {
      return res.json(data)
    })
  },

  // DELETE http://localhost:3000/admin/categories/6
  deleteCategory: (req, res) => {
    categoryService.deleteCategory(req, res, (data) => {
      return res.json(data)
    })
  },

}

module.exports = categoryController