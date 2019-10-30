/********************************************************************
* Admin - 取得所有 Product
* GET http://localhost:3000/api/admin/products
********************************************************************/

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     tags:
 *      - Admin
 *     description: Admin - 取得所有 Product
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Put in category id that user want to query
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Put in keyword that user want to query
 *     responses:
 *       200:
 *         description: 取得所有 Product 成功
 */

/********************************************************************
* Admin - 取得特定 Product
* GET http://localhost:3000/api/admin/products/:product_id
********************************************************************/

/**
 * @swagger
 * /api/admin/products/{product_id}:
 *   get:
 *     tags:
 *      - Admin
 *     description: Admin - 取得特定 Product
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
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

/********************************************************************
* Admin - 新增 Product
* POST http://localhost:3000/api/admin/products
********************************************************************/

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     tags:
 *      - Admin
 *     description: Admin - 新增 Product
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: Product 的 name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: Product 的 description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: Product 的 price
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: recommended_price
 *         description: Product 的 recommended price
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: inventory
 *         description: Product 的 inventory
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: length
 *         description: Product 的 length
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: width
 *         description: Product 的 width
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: height
 *         description: Product 的 height
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: weight
 *         description: Product 的 weight
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: category_id
 *         description: Category 的 category id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: image
 *         description: Product 的 image
 *         in: formData
 *         required: false
 *         type: file
 *     responses:
 *       200:
 *         description: 新增 Product 成功
 */

/********************************************************************
* Admin - 修改 Product
* PUT http://localhost:3000/api/admin/products/:product_id
********************************************************************/

/**
 * @swagger
 * /api/admin/products/{product_id}:
 *   put:
 *     tags:
 *      - Admin
 *     description: Admin - 修改 Product
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         type: integer
 *         required: true
 *         description: product_id
 *       - name: name
 *         description: Product 的 name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: Product 的 description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: Product 的 price
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: recommended_price
 *         description: Product 的 recommended price
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: inventory
 *         description: Product 的 inventory
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: length
 *         description: Product 的 length
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: width
 *         description: Product 的 width
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: height
 *         description: Product 的 height
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: weight
 *         description: Product 的 weight
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: category_id
 *         description: Category 的 category id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: image
 *         description: Product 的 image
 *         in: formData
 *         required: false
 *         type: file
 *     responses:
 *       200:
 *         description: 修改 Product 成功
 */

/********************************************************************
* Admin - 刪除 Product
* DELETE http://localhost:3000/api/admin/products/:product_id
********************************************************************/

/**
 * @swagger
 * /api/admin/products/{product_id}:
 *   delete:
 *     tags:
 *      - Admin
 *     description: Admin - 刪除 Product
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         type: integer
 *         required: true
 *         description: product_id
 *     responses:
 *       200:
 *         description: 刪除 Product 成功
 */