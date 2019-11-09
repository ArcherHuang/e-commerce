// npm install --save request
// npm install --save request-promise

const request = require('request-promise')

const nodeRedService = {

  addTaskToQueue: (req, res, callback) => {
    const options = {
      method: 'POST',
      uri: `${process.env.NODE_RED_IP}/send/coupon`,
      body: req.body,
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    request(options).then(function (response) {
      callback({ status: 'success', message: response })
    })
      .catch(function (err) {
        console.log(err)
        callback({ status: 'fail', message: response })
      })

  }

}

module.exports = nodeRedService  