/********************************************************************
* Cart - 將商品加入購物車
* POST http://localhost:3000/carts
********************************************************************/

/**
 * @swagger
 * /carts:
 *   post:
 *     tags:
 *      - Cart
 *     description: Cart - 將商品加入購物車
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productId
 *         description: Product 的 id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 將商品加入購物車 成功
 */