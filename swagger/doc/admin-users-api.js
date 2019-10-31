/********************************************************************
* Admin - 取得使用者清單
* GET http://localhost:3000/api/admin/users
********************************************************************/

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     tags:
 *      - Admin
 *     description: Admin - 取得使用者清單
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 登入成功
 */

/********************************************************************
* Admin - 使用者權限變更
* PUT http://localhost:3000/api/admin/users/:user_id
********************************************************************/

/**
 * @swagger
 * /api/admin/users/{user_id}:
 *   put:
 *     tags:
 *      - Admin
 *     description: Admin - 使用者權限變更
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         type: integer
 *         required: true
 *         description: user_id
 *     responses:
 *       200:
 *         description: 權限修改成功
 */