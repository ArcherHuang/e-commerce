const db = require('../models')
const Category = db.Category

const categoryService = {

  getCategories: (req, res, callback) => {

    return Category.findAll().then(categories => {

      if (req.params.id) {
        Category.findByPk(req.params.id)
          .then((category) => {
            return res.render('admin/categories', { categories, category })
          })
      } else {
        callback({ status: 'success', categories })

      }

    })

  },

  postCategory: (req, res, callback) => {

    const name = req.body.name === undefined ? '' : req.body.name.trim()
    if (name.length == 0) {
      return callback({ status: 'error', message: '請輸入分類名稱 !' })
    } else {

      Category.findOne({
        where: {
          name
        }
      }).then((category) => {
        if (category) {
          return callback({ status: 'error', message: '分類重複！' })
        } else {
          Category.create({
            name
          }).then((category) => {
            return callback({ status: 'success', message: '分類已建立成功' })
          })
        }
      })

    }

  },

  putCategory: (req, res, callback) => {

    const name = req.body.name === undefined ? '' : req.body.name.trim()
    if (name.length == 0) {
      return callback({ status: 'error', message: '請輸入分類名稱 !' })
    } else {
      return Category.findByPk(req.params.id)
        .then((category) => {
          category.update(req.body)
            .then((category) => {
              callback({ status: 'success', message: '分類已修改成功' })
            })
        })
    }

  },

  deleteCategory: (req, res, callback) => {

    Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      return callback({ status: 'success', message: '分類已刪除' })
    })

  },

}

module.exports = categoryService  