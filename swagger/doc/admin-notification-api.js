/********************************************************************
* Admin - 取得 notification 清單
* GET http://localhost:3000/admin/notifications
********************************************************************/

/**
 * @swagger
 * /admin/notifications:
 *   get:
 *     tags:
 *      - Admin
 *     description: Admin - 取得 notification 清單
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 取得 notification 清單成功
 */