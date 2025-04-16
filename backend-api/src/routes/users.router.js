const express = require("express");
const { methodNotAllowed } = require("../controllers/errors.controller");
const router = express.Router();

const multer = require("multer"); // sử dụng multipart/form-data
const upload = multer(); // cấu hình multer
const userController = require("../controllers/users.controller");

module.exports.setup = (app) => {
  app.use("/api/v1/user", router);
  /**
   * @swagger
   * /api/v1/user/register:
   *   post:
   *     summary: Đăng ký người dùng mới
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               u_acc:
   *                 type: string
   *                 example: "john_doe"
   *               acc_pwd:
   *                 type: string
   *                 example: "password123"
   *               u_name:
   *                 type: string
   *                 example: "John Doe"
   *               u_phone:
   *                 type: string
   *                 example: "0123456789"
   *               u_add_street:
   *                 type: string
   *                 example: "123 Main St"
   *               u_add_district:
   *                 type: string
   *                 example: "District 1"
   *               u_add_city:
   *                 type: string
   *                 example: "Ho Chi Minh City"
   *               u_add_province:
   *                 type: string
   *                 example: "Southern Vietnam"
   *     responses:
   *       201:
   *         description: Người dùng đã đăng ký thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: Người dùng đã đăng ký thành công
   *       400:
   *         description: Thiếu thông tin bắt buộc
   *       500:
   *         description: Lỗi server
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.post(
    "/register",
    upload.none(),
    (req, res, next) => {
      console.log("Request tới /register");
      next();
    },
    userController.registerUser
  );

  /**
   * @swagger
   * /api/v1/user/login:
   *   post:
   *     summary: Đăng nhập người dùng
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               u_acc:
   *                 type: string
   *                 example: "john_doe"
   *               acc_pwd:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       200:
   *         description: Đăng nhập thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: Đăng nhập thành công
   *                 user:
   *                   type: object
   *                   properties:
   *                     u_acc:
   *                       type: string
   *                       example: "john_doe"
   *                     u_name:
   *                       type: string
   *                       example: "John Doe"
   *                     u_phone:
   *                       type: string
   *                       example: "0123456789"
   *       400:
   *         description: Thiếu thông tin đăng nhập
   *       401:
   *         description: Tài khoản không tồn tại hoặc mật khẩu không đúng
   *       500:
   *         description: Lỗi server
   */
  router.post("/login", upload.none(), userController.loginUser);

  /**
   * @swagger
   * /api/v1/user/logout:
   *   post:
   *     summary: Đăng xuất người dùng
   *     tags: [User]
   *     responses:
   *       200:
   *         description: Đăng xuất thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: User logged out successfully
   *       500:
   *         description: Lỗi server
   */
  router.post("/logout", userController.logoutUser);
  router.all("/", methodNotAllowed);
};
