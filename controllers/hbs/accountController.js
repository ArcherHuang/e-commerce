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
  },

  getProfileEditPage: async (req, res) => {
    await userService.getProfile(req, res, async (data) => {
      try {
        if (data['status'] == 'success') {
          await res.render('accountsEditPage', {
            user: data.content,
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
  },

  putProfile: async (req, res) => {
    await userService.putProfile(req, res, (data) => {
      if (data['status'] == 'success') {
        req.flash('success_messages', "更新個人資訊成功")
        res.redirect('/accounts')
      } else {
        req.flash('error_messages', "更新個人資訊失敗")
        res.redirect('/accounts/edit')
      }
    })
  },

  getOrders: async (req, res) => {
    await userService.getOrders(req, res, (data) => {
      try {
        if (data['status'] == 'success') {

          let orders = data.content
          orders = orders.map(r => ({
            id: r.id,
            totalAmount: r.totalAmount,
            dataStatus: r.dataStatus,
            paymentStatus: r.paymentStatus,
            shippingStatus: r.shippingStatus,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            // 將資料狀態轉換成字串顯示
            dataStatusString: userController.transformDataStatus(r.dataStatus),
            shippingStatusString: userController.transformShippingStatus(r.shippingStatus),
            paymentStatusString: userController.transformPaymentStatus(r.paymentStatus),
          }))
          res.render('accountsOrders', { orders: orders })
        } else {
          req.flash('error_messages', "取得訂單清單失敗")
          res.redirect('/accounts')
        }
      }
      catch (err) {
        console.log(`ERR: ${err}`)
      }
    })
  },

  getOrder: async (req, res) => {

    await userService.getOrder(req, res, (data) => {
      try {
        if (data['status'] == 'success') {

          // 取得訂單資訊
          let order = data.content
          // 取得產品資訊
          let products = data.content.items
          // 整理產品資訊
          order = {
            id: order.id,
            name: order.name,
            phone: order.phone,
            address: order.address,
            totalAmount: order.totalAmount,
            dataStatus: order.dataStatus,
            paymentStatus: order.paymentStatus,
            shippingStatus: order.shippingStatus,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            // 將資料狀態轉換成字串顯示
            dataStatusString: userController.transformDataStatus(order.dataStatus),
            shippingStatusString: userController.transformShippingStatus(order.shippingStatus),
            paymentStatusString: userController.transformPaymentStatus(order.paymentStatus),
          }

          // 取出訂單中的商品數量
          products = products.map(r => ({
            id: r.id,
            name: r.name,
            description: r.description,
            price: r.price,
            quantity: r.OrderItem.quantity
          }))

          res.render('accountsOrderDetails', { order: order, products: products })
        } else {
          req.flash('error_messages', "取得訂單細節失敗")
          res.redirect('/accounts/orders')
        }
      }
      catch (err) {
        console.log(`ERR: ${err}`)
      }
    })
  },

  cancelOrder: async (req, res) => {
    try {
      await userService.cancelOrder(req, res, (data) => {
        if (data['status'] == 'success') {
          // req.flash('success_messages', "取消訂單成功")
          res.redirect('back')
        } else {
          // req.flash('error_messages', "取消訂單失敗")
          res.redirect('back')
        }
      })
    }
    catch (err) {
      console.log(`ERR: ${err}`)
    }
  },

  // 將 dataStatus 轉為文字
  transformDataStatus: (d) => {
    if (d == 0) {
      d = "已刪除"
    } else if (d == 1) {
      d = "成立"
    } else if (d == 2) {
      d = "已取消"
    } else {
      d = "狀態有誤"
    }
    return d
  },

  // 將 paymentStatus 轉為文字
  transformPaymentStatus: (d) => {
    if (d == 0) {
      d = "待付款"
    } else if (d == 1) {
      d = "已付款"
    } else if (d == 2) {
      d = "取消付款"
    } else {
      d = "狀態有誤"
    }
    return d
  },

  // 將 shippingStatus 轉為文字
  transformShippingStatus: (d) => {
    if (d == 0) {
      d = "待出貨"
    } else if (d == 1) {
      d = "已出貨"
    } else if (d == 2) {
      d = "取消出貨"
    } else {
      d = "狀態有誤"
    }
    return d
  },
}
module.exports = userController
