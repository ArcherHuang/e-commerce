const db = require('../models')
const { Order, Cart, OrderItem, Product } = db
const moment = require('moment')
const crypto = require('crypto')

// Payment variables
const URL = process.env.LOCAL_NGROK_URL
const MerchantID = process.env.MERCHANT_ID
const HashKey = process.env.HASH_KEY
const HashIV = process.env.HASH_IV
const PayGateWay = "https://ccore.spgateway.com/MPG/mpg_gateway"
const ReturnURL = URL + "/orders/newebpay/callback?from=ReturnURL"
const NotifyURL = URL + "/orders/newebpay/callback?from=NotifyURL"
const ClientBackURL = URL + "/orders"

const orderService = {

  postOrder: (req, res, callback) => {

    try {
      // 利用時間產生序號 (sn) 並額外加入四位亂碼
      let sn = Date.now()
      sn = Math.random().toString(36).slice(-4) + sn
      sn = sn.toUpperCase()

      return Cart.findOne({
        where: {
          Id: req.body.cart_id
        },
        include: [
          { model: Product, as: "items" }
        ]
      }).then(cart => {

        // 先建立訂單，取得 order.id
        let totalPrice = cart.totalPrice ? cart.totalPrice : 0
        return Order.create({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          sn: sn,
          totalAmount: totalPrice,
          UserId: req.user.id,
          shippingStatus: 0, // 待出貨 0, 已出貨 1, 取消出貨 2
          paymentStatus: 0,  // 待付款 0, 已付款 1, 取消付款 2
          dataStatus: 1,     // 訂單刪除 0, 訂單存在 1, 訂單取消 2
        }).then(order => {

          // 將 cart items 放入 order items
          let results = []
          for (let i = 0; i < cart.items.length; i++) {
            results.push(
              OrderItem.create({
                OrderId: order.id,
                ProductId: cart.items[i].id,
                price: cart.items[i].price,
                quantity: cart.items[i].CartItem.quantity,
              })
            )
          }

          return Promise.all(results).then(() => {
            Order.findAll({
              where: {
                id: order.id,
              },
              include: [
                OrderItem,
                { model: Product, as: "items" },
              ]
            }).then(order => {
              return callback({ status: 'success', message: '建立訂單成功', content: order })
            }).catch(err => {
              return callback({ status: 'error', message: '建立訂單失敗' })
            })
          }
          ).catch(err => {
            return callback({ status: 'error', message: '建立訂單失敗' })
          })
        })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '建立訂單失敗' })
    }
  },

  //建立交易參數
  getPayment: (req, res, callback) => {
    try {
      return Order.findOne({
        where: {
          id: req.params.order_id,
          paymentStatus: 0,
          dataStatus: 1
        }
      }).then(order => {
        const tradeInfo = getTradeInfo(order, req.user)
        return callback({ status: 'success', message: '建立交易參數成功', content: tradeInfo })
      }).catch(err => {
        return callback({ status: 'error', message: '建立交易參數失敗' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '建立交易參數失敗' })
    }
  },

  // 取得藍新金流 callback 資料
  newebpayCallback: (req, res, callback) => {
    try {
      // 解析藍新金流 callback 資料
      const data = JSON.parse(createMpgAesDecrypt(req.body.TradeInfo))
      // 更新訂單付款狀態
      return Order.findOne({
        where: { sn: data['Result']['MerchantOrderNo'] }
      }).then(order => {
        order.update({
          paymentStatus: 1,  // 待付款 0, 已付款 1, 取消付款 2
        }).then(order => {
          return callback({ status: 'success', message: '更新訂單付款資訊成功', content: order })
        }).catch(err => {
          return callback({ status: 'error', message: '更新訂單付款資訊失敗' })
        })
      }).catch(err => {
        return callback({ status: 'error', message: '欲更新之訂單不存在' })
      })
    }
    catch (err) {
      return callback({ status: 'error', message: '取得藍新金流 callback 資料失敗' })
    }
  }
}

// 
function genDataChain(tradeInfo) {
  let results = [];
  for (let kv of Object.entries(tradeInfo)) {
    results.push(`${kv[0]}=${kv[1]}`);
  }
  return results.join("&");
}

// 建立 AES 加密
function createMpgAesEncrypt(tradeInfo) {
  let encrypt = crypto.createCipheriv("aes256", HashKey, HashIV);
  let enc = encrypt.update(genDataChain(tradeInfo), "utf8", "hex");
  return enc + encrypt.final("hex");
}

// AES 解密
function createMpgAesDecrypt(tradeInfo) {
  let decrypt = crypto.createDecipheriv("aes256", HashKey, HashIV);
  decrypt.setAutoPadding(false);
  let text = decrypt.update(tradeInfo, "hex", "utf8");
  let plainText = text + decrypt.final("utf8");
  let result = plainText.replace(/[\x00-\x20]+/g, "");
  return result;
}

// 建立 SHA 雜湊
function createMpgShaEncrypt(tradeInfo) {

  let sha = crypto.createHash("sha256");
  let plainText = `HashKey=${HashKey}&${tradeInfo}&HashIV=${HashIV}`

  return sha.update(plainText).digest("hex").toUpperCase();
}

// 建立訂單資訊 tradeInfo
function getTradeInfo(order, user) {

  data = {
    'MerchantID': MerchantID,                   // 商店代號
    'RespondType': 'JSON',                      // 回傳格式
    'TimeStamp': Date.now(),                    // 時間戳記
    'Version': 1.5,                             // 串接程式版本
    'MerchantOrderNo': order.sn,                // 商店訂單編號
    'LoginType': 0,                             // 智付通會員
    'OrderComment': '',                         // 商店備註
    'Amt': order.totalAmount,                   // 訂單金額
    'ItemDesc': `${user.name}'s purchase`,      // 產品名稱
    'Email': user.email,                        // 付款人電子信箱
    'ReturnURL': ReturnURL,                     // 支付完成返回商店網址
    'NotifyURL': NotifyURL,                     // 支付通知網址/每期授權結果通知
    'ClientBackURL': ClientBackURL,             // 支付取消返回商店網址
  }

  // 建立 AES 加密資料
  mpgAesEncrypt = createMpgAesEncrypt(data)
  // 建立 SHA 雜湊資料
  mpgShaEncrypt = createMpgShaEncrypt(mpgAesEncrypt)
  // 建立 tradeInfo
  tradeInfo = {
    'MerchantID': MerchantID,
    'TradeInfo': mpgAesEncrypt,
    'TradeSha': mpgShaEncrypt,
    'Version': 1.5,
    'PayGateWay': PayGateWay,
    'MerchantOrderNo': data.MerchantOrderNo,
  }
  return tradeInfo
}

module.exports = orderService