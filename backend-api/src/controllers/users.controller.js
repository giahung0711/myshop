const bcrypt = require("bcrypt");
const saltRounds = 10;
const userService = require("../services/users.service");

// Đăng ký
async function registerUser(req, res) {
  const {
    u_acc,
    acc_pwd,
    u_name,
    u_phone,
    u_add_street,
    u_add_district,
    u_add_city,
    u_add_province,
  } = req.body;

  if (!u_acc || !acc_pwd || !u_name || !u_phone) {
    return res
      .status(400)
      .json({ status: "fail", message: "Thiếu thông tin bắt buộc" });
  }

  try {
    const hashedPassword = await bcrypt.hash(acc_pwd, saltRounds);

    const userData = {
      u_acc,
      acc_pwd: hashedPassword,
      acc_role: 0,
      u_name,
      u_phone,
      u_add_street,
      u_add_district,
      u_add_city,
      u_add_province,
    };

    const result = await userService.addUser(userData);

    return res.status(201).json({
      status: "success",
      message: result.message,
    });
  } catch (err) {
    console.error("Lỗi khi đăng ký người dùng: ", err);
    return res.status(500).json({
      status: "error",
      message: "Lỗi truy vấn cơ sở dữ liệu",
      error: err.message,
    });
  }
}

// Đăng nhập
async function loginUser(req, res) {
  const { u_acc, acc_pwd } = req.body;

  if (!u_acc || !acc_pwd) {
    return res
      .status(400)
      .json({ status: "fail", message: "Thiếu thông tin đăng nhập" });
  }

  try {
    const result = await userService.compareUser(u_acc);
    if (result.status === "fail") {
      return res.status(401).json(result);
    }

    const isMatch = await bcrypt.compare(acc_pwd, result.user.acc_pwd);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "fail", message: "Mật khẩu không đúng" });
    }

    return res.status(200).json({
      status: "success",
      message: "Đăng nhập thành công",
      user: result.user,
    });
  } catch (err) {
    console.error("Lỗi khi đăng nhập: ", err);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi server", error: err.message });
  }
}

// Đăng xuất
function logoutUser(req, res) {
  try {
    return res.status(200).json({
      status: "success",
      message: "Đăng xuất thành công",
    });
  } catch (err) {
    console.error("Lỗi khi đăng xuất: ", err);
    return res.status(500).json({
      status: "error",
      message: "Lỗi server",
      error: err.message,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
