const categoryService = require('../../../services/admin/categoryService')

const categoryController = {

  responseMessageAction: (req, res, data, successAction, errorAction) => {
    try {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        res.redirect(successAction)
      } else {
        req.flash('error_messages', data['message'])
        return res.redirect(errorAction)
      }
    }
    catch (err) {
      console.log(`Err: ${err}`)
      req.flash('error_messages', "分類功能操作失敗")
      res.redirect('back')
    }
  },

  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.render('admin/categories', {
        [data['key']]: data['content']
      })
    })
  },

  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
      categoryController.responseMessageAction(req, res, data, '/admin/categories', 'back')
    })
  },

  putCategory: (req, res) => {
    categoryService.putCategory(req, res, (data) => {
      categoryController.responseMessageAction(req, res, data, '/admin/categories', 'back')
    })
  },

  deleteCategory: (req, res) => {
    console.log(`deleteCategorydeleteCategory`)
    categoryService.deleteCategory(req, res, (data) => {
      categoryController.responseMessageAction(req, res, data, '/admin/categories', '/admin/categories')
    })
  },

  getCategoryEditPage: async (req, res) => {
    let targetId = req.params.category_id || null
    req.params.category_id = null
    await categoryService.getCategories(req, res, (data) => {
      try {
        if (data['status'] === 'success') {
          return res.render('admin/categories', {
            categories: data.content,
            targetId: targetId
          })
        } else {
          return res.redirect('back')
        }
      }
      catch (err) {
        console.log(`Err: ${err}`)
        res.redirect('back')
      }
    })
  },

}

module.exports = categoryController