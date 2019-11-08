/********************************************************************
* 新增 Coupon 到 Queue
* POST http://localhost:3000/send/coupon/users
********************************************************************/

/**
 * @swagger
 * /send/coupon/users:
 *   post:
 *     tags:
 *      - Queue
 *     description: 新增 Coupon 到 Queue
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Admin User 的 email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Admin User 的 password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: coupon_id
 *         description: Coupon 的 coupon_id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: userEmail
 *         description: 將 Coupon 發送給 User 的 userEmail
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 新增 Coupon 到 Queue 成功
 */
