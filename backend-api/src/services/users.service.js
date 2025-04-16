const knex = require("../database/knex");
const Paginator = require("./paginator");
const { unlink } = require("node:fs");
function userRepository() {
  return knex("users");
}

function readUser(payload) {
  return {
    u_acc: payload.u_acc,
    acc_pwd: payload.acc_pwd,
    u_name: payload.u_name,
    u_phone: payload.u_phone,
    u_add_street: payload.u_add_street,
    u_add_district: payload.u_add_district,
    u_add_city: payload.u_add_city,
    u_add_province: payload.u_add_province,
  };
}

// Hàm để thêm người dùng vào cơ sở dữ liệu
async function addUser(payload) {
  const user = readUser(payload);
  try {
    await userRepository().insert(user);
    return { status: "success", message: "Người dùng đã đăng ký thành công" };
  } catch (err) {
    console.error("Lỗi khi thêm người dùng: ", err);
    throw new Error("Lỗi truy vấn cơ sở dữ liệu");
  }
}

// Hàm kiểm tra đăng nhập
async function compareUser(u_acc) {
  try {
    const user = await userRepository().where({ u_acc }).first();
    if (!user) {
      return { status: "fail", message: "Tài khoản không tồn tại" };
    }
    return { status: "success", user };
  } catch (err) {
    console.error("Lỗi khi lấy thông tin người dùng: ", err);
    throw new Error("Lỗi server");
  }
}

// Hàm đăng xuất
function logout(res) {
  return {
    status: "success",
    message: "User logged out successfully",
  };
}

module.exports = {
  readUser,
  addUser,
  compareUser,
  logout,
};
