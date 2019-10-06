/********************************************************************
* Admin - 取得所有分類
* GET http://localhost:3000/admin/categories
********************************************************************/

/**
 * @swagger
 * /admin/categories:
 *   get:
 *     tags:
 *      - Admin
 *     description: Admin - 取得所有分類
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 登入成功
 */

/********************************************************************
* Admin - 取得特定分類
* GET http://localhost:3000/admin/categories/:category_id
********************************************************************/

/**
 * @swagger
 * /admin/categories/{category_id}:
 *   get:
 *     tags:
 *      - Admin
 *     description: Admin - 取得特定分類
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         type: integer
 *         required: true
 *         description: category_id
 *     responses:
 *       200:
 *         description: 登入成功
 */

/********************************************************************
* Admin - 新增分類
* POST http://localhost:3000/admin/categories
********************************************************************/

/**
 * @swagger
 * /admin/categories:
 *   post:
 *     tags:
 *      - Admin
 *     description: Admin - 新增分類
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: 分類的 name
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 登入成功
 */

/********************************************************************
* Admin - 修改分類
* POST http://localhost:3000/admin/categories/:category_id
********************************************************************/

/**
 * @swagger
 * /admin/categories/{category_id}:
 *   put:
 *     tags:
 *      - Admin
 *     description: Admin - 修改分類
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         type: integer
 *         required: true
 *         description: category_id
 *       - name: name
 *         description: 分類的 name
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 登入成功
 */

/********************************************************************
* Admin - 刪除分類
* DELETE http://localhost:3000/admin/categories/:category_id
********************************************************************/

/**
 * @swagger
 * /admin/categories/{category_id}:
 *   delete:
 *     tags:
 *      - Admin
 *     description: Admin - 刪除分類
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         type: integer
 *         required: true
 *         description: category_id
 *     responses:
 *       200:
 *         description: 登入成功
 */