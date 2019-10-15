let mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

const sendEmailService = {

  // content = {
  //   email: 寄給誰
  //   subject: 主旨
  //   type: html / text
  //   info: 內容
  // }

  mailInfo: ({ email, subject, type, info }) => {

    return new Promise(resolve => {
      const data = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject,
        [type]: info
      }

      mailgun.messages().send(data, (error, body) => {
        // console.log(`mailgun: ${JSON.stringify(body)}`)
        resolve(body)
      })

    })

  },

}

module.exports = sendEmailService  