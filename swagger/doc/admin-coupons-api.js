/********************************************************************
* Admin - 取得所有 Coupon
* GET http://localhost:3000/admin/coupons
********************************************************************/

/**
 * @swagger
 * /admin/coupons:
 *   get:
 *     tags:
 *      - Admin
 *     description: Admin - 取得所有 Coupon
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 取得所有 Coupon 成功
 */

/********************************************************************
* Admin - 取得特定 Coupon
* GET http://localhost:3000/admin/coupons/:coupon_id
********************************************************************/

/**
 * @swagger
 * /admin/coupons/{coupon_id}:
 *   get:
 *     tags:
 *      - Admin
 *     description: Admin - 取得特定 Coupon
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coupon_id
 *         type: integer
 *         required: true
 *         description: coupon_id
 *     responses:
 *       200:
 *         description: 取得特定 Coupon 成功
 */

/********************************************************************
* Admin - 新增 Coupon
* POST http://localhost:3000/admin/coupons
********************************************************************/

/**
 * @swagger
 * /admin/coupons:
 *   post:
 *     tags:
 *      - Admin
 *     description: Admin - 新增 Coupon
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: Coupon 的 name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: number_of_limitation
 *         description: Coupon 的 number of limitation
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: discount
 *         description: Coupon 的 discount
 *         in: formData
 *         required: false
 *         type: integer
 *       - name: amount
 *         description: Coupon 的 amount
 *         in: formData
 *         required: false
 *         type: integer
 *       - name: expire_date
 *         description: Coupon 的 expire date ( YYYY-MM-DD )
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 新增 Coupon 成功
 */

/********************************************************************
* Admin - 修改 Coupon
* PUT http://localhost:3000/admin/coupons/:coupon_id
********************************************************************/

/**
 * @swagger
 * /admin/coupons/{coupon_id}:
 *   put:
 *     tags:
 *      - Admin
 *     description: Admin - 修改 Coupon
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coupon_id
 *         type: integer
 *         required: true
 *         description: coupon_id
 *       - name: name
 *         description: Coupon 的 name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: number_of_limitation
 *         description: Coupon 的 number of limitation
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: discount
 *         description: Coupon 的 discount
 *         in: formData
 *         required: false
 *         type: integer
 *       - name: amount
 *         description: Coupon 的 amount
 *         in: formData
 *         required: false
 *         type: integer
 *       - name: expire_date
 *         description: Coupon 的 expire date ( YYYY-MM-DD )
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 修改 Coupon 成功
 */

/********************************************************************
* Admin - 刪除 Coupon
* DELETE http://localhost:3000/admin/coupons/:coupon_id
********************************************************************/

/**
 * @swagger
 * /admin/coupons/{coupon_id}:
 *   delete:
 *     tags:
 *      - Admin
 *     description: Admin - 刪除 Coupon
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coupon_id
 *         type: integer
 *         required: true
 *         description: coupon_id
 *     responses:
 *       200:
 *         description: 刪除 Coupon 成功
 */


/********************************************************************
* Admin - 發送 Coupon
* POST http://localhost:3000/admin/coupons/:coupon_id/send
********************************************************************/

/**
 * @swagger
 * /admin/coupons/{coupon_id}/send:
 *   post:
 *     tags:
 *      - Admin
 *     description: Admin - 發送 Coupon
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coupon_id
 *         type: integer
 *         required: true
 *         description: coupon_id
 *       - name: email
 *         description: 預寄送的使用者 email
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 新增 Coupon 成功
 */