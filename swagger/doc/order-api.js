/********************************************************************
* Orders - 建立訂單
* POST http://localhost:3000/orders
********************************************************************/

/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *      - Ordres
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
 *         description: 取得訂單清單成功
 */
