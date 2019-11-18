
const path = require('path')
const fs = require('fs')
const AWS = require('aws-sdk')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
})
const BUCKET_NAME = 'ajashop'

async function uploadImageToS3(imgPath) {
  return new Promise(resolve => {
    const fileContent = fs.readFileSync(imgPath)
    const params = {
      Bucket: BUCKET_NAME,
      Key: path.basename(imgPath),
      Body: fileContent,
      ACL: 'public-read'
    }

    s3.upload(params, (err, data) => {
      if (err) {
        return reject(err)
      }
      // console.log(`File uploaded successfully. ${data.Location}`)
      return resolve(data.Location)
    })
  })

}

const csvFilePath = './items.csv'
const csv = require('csvtojson')
csv()
  .fromFile(csvFilePath)
  .then(async (jsonObj) => {

    console.log(`Total Image: ${jsonObj.length}`)
    for (let i = 0; i < jsonObj.length; i++) {
      let imgPath = path.join(__dirname, `ikea_images/${jsonObj[i]['image']}`)
      const imgPathResult = await uploadImageToS3(imgPath)
      console.log(`[${i + 1}] image: ${imgPathResult}`)

      item = {
        ...jsonObj[i],
        image: imgPathResult,
        weight: `${(jsonObj[i]['length'] * jsonObj[i]['width'] * jsonObj[i]['height'] * 0.0000353).toFixed(2)}`,
        recommendedPrice: `${Math.ceil(jsonObj[i]['price'] / 0.9)}`,
        detail: `${jsonObj[i]['detail'].replace(/\n/g, ' ')}`,
        CategoryId: jsonObj[i]['name'] === 'PAX' ? 2 : 1,
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      delete item['Id']
      jsonObj[i] = item

    }

    let data = JSON.stringify(jsonObj)
    fs.writeFileSync('products.json', data)

  })