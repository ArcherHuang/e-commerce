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
 *         description: 使用者的 birthday
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 註冊成功
 */