/********************************************************************
* Orders - 建立訂單
* POST http://localhost:3000/api/orders
********************************************************************/

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *      - Orders
 *     description: Order - 建立訂單
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cart_id
 *         description: 購買者的購物車 ID
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: 購買者的 name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: address
 *         description: 購買者的 address
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phone
 *         description: 購買者的 phone
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 建立訂單成功
 */


/********************************************************************
* Order - 建立交易參數
* GET http://localhost:3000/api/orders/:order_id/payment
********************************************************************/

/**
 * @swagger
 * /api/orders/{order_id}/payment:
 *   get:
 *     tags:
 *      - Orders
 *     description: order - 建立交易參數
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         type: integer
 *         required: true
 *         description: order_id
 *     responses:
 *       200:
 *         description: 建立交易參數成功
 */
