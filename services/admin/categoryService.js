const db = require('../../models')
const Category = db.Category

const categoryService = {

  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => {
      if (req.params.category_id) {
        Category.findByPk(req.params.category_id)
          .then((category) => {
            callback({ status: 'success', message: '取得特定分類成功', content: category, key: 'category' })
          })
      } else {
        callback({ status: 'success', message: '取得所有分類成功', content: categories, key: 'categories' })
      }
    })
  },

  postCategory: (req, res, callback) => {
    const name = req.body.name === undefined ? '' : req.body.name.trim()
    const description = req.body.description === undefined ? '' : req.body.description.trim()
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
            name,
            description
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
      return Category.findByPk(req.params.category_id)
        .then((category) => {
          category.update(req.body)
            .then((category) => {
              callback({ status: 'success', message: '分類已修改成功' })
            })
        })
    }
  },

  deleteCategory: (req, res, callback) => {
    Category.findByPk(req.params.category_id)
      .then((category) => {
        if (category) {
          category.update({
            dataStatus: 0
          })
            .then((category) => {
              callback({ status: 'success', message: '分類已刪除成功' })
            })
        } else {
          callback({ status: 'fail', message: '查無此分類存在' })
        }

      })
  },
}

module.exports = categoryService  