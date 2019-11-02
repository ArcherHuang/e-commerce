const userService = require('../../services/userService.js')
const express = require('express')
const app = express()

const db = require('../../models')
const { User, Product, Order, OrderItem, Coupon, CouponDistribution, Review, PageView } = db

const userController = {

  responseMessageAction: (req, res, data, successAction, errorAction) => {
    if (data['status'] === 'success') {
      req.flash('success_messages', data['message'])
      res.redirect(successAction)
    } else {
      req.flash('error_messages', data['message'])
      return res.redirect(errorAction)
    }
  },

  signInView: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    userService.signIn(req, res, (data) => {
      userController.responseMessageAction(req, res, data, '/products', '/accounts/signin')
    })
  },

  signUpView: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res, next) => {
    userService.signUp(req, res, (data) => {
      userController.responseMessageAction(req, res, data, '/accounts/signin', '/accounts/signup')
    })
  },

  checkEmail: (req, res, next) => {
    userService.checkEmail(req, res, (data) => {
      userController.responseMessageAction(req, res, data, '/accounts/signin', '/accounts/signin')
    })
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },

  getProfile: async (req, res) => {

    await userService.getProfile(req, res, async (data) => {
      try {
        if (data['status'] == 'success') {
          await res.render('accountsMainPage', {
            user: data.content,
            productLiked: data.content.productLiked,
            productViewed: data.content.productViewed,
            productReviewed: data.content.productReviewed,
          })
        } else {
          req.flash('error_messages', "請先登入")
          res.redirect('/products')
        }
      } catch (err) {
        req.flash('error_messages', "無法取得使用者個人頁面")
        console.log(`Err: ${err}`)
      }
    })
  }

}
module.exports = userController
