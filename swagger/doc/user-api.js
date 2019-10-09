/********************************************************************
* Accounts - 使用者登入
* POST http://localhost:3000/accounts/signin
********************************************************************/

/**
 * @swagger
 * /accounts/signin:
 *   post:
 *     tags:
 *      - Accounts
 *     description: Accounts - 使用者登入
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 使用者的 email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 登入的密碼
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 登入成功
 */

/********************************************************************
* Accounts - 使用者註冊
* POST http://localhost:3000/accounts/signup
********************************************************************/

/**
 * @swagger
 * /accounts/signup:
 *   post:
 *     tags:
 *      - Accounts
 *     description: Accounts - 使用者註冊
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: 使用者的 name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: 使用者的 email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 使用者的 password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: passwordCheck
 *         description: 再次確認 password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phone
 *         description: 使用者的 phone
 *         in: formData
 *         required: true
 *         type: string
 *       - name: address
 *         description: 使用者的 address
 *         in: formData
 *         required: true
 *         type: string
 *       - name: birthday
 *         description: 使用者的 birthday ( YYYY-MM-DD )
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 註冊成功
 */

/********************************************************************
* Accounts - 設定連結時效與寄發 mail
* POST http://localhost:3000/accounts/reset-password
********************************************************************/

/**
 * @swagger
 * /accounts/reset-password:
 *   post:
 *     tags:
 *      - Accounts
 *     description: Accounts - 設定連結時效與寄發 mail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 使用者的 email
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 設定成功
 */

/********************************************************************
* Accounts - 驗證所收到的 email 連結是否還在有效期限內
* GET http://localhost:3000/accounts/reset-password/{token}
********************************************************************/

/**
 * @swagger
 * /accounts/reset-password/{token}:
 *   get:
 *     tags:
 *      - Accounts
 *     description: Accounts - 驗證所收到的 email 連結是否還在有效期限內
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         type: string
 *         required: true
 *         description: redis token ( from email )
 *     responses:
 *       200:
 *         description: 驗證成功
 */

/********************************************************************
* Accounts - 設定密碼
* PUT http://localhost:3000/accounts/modify-password
********************************************************************/

/**
 * @swagger
 * /accounts/modify-password:
 *   put:
 *     tags:
 *      - Accounts
 *     description: Accounts - 設定密碼
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: password
 *         description: 使用者新的 password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: passwordCheck
 *         description: 再次輸入 password 以確認跟第一次輸入的相同
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 修改密碼成功
 */

/********************************************************************
* Accounts - 取得所有 Product
* GET http://localhost:3000/products
********************************************************************/

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *      - Accounts
 *     description: Account - 取得所有 Product
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Put in category id that user want to query
 *     responses:
 *       200:
 *         description: 取得所有 Product 成功
 */

/********************************************************************
* Accounts - 取得特定 Product
* GET http://localhost:3000/products/:product_id
********************************************************************/

/**
 * @swagger
 * /products/{product_id}:
 *   get:
 *     tags:
 *      - Accounts
 *     description: Account - 取得特定 Product
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: product_id
 *         type: integer
 *         required: true
 *         description: product_id
 *     responses:
 *       200:
 *         description: 取得特定 Product 成功
 */