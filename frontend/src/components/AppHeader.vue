<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100">
    <div class="container-fluid">
      <!-- Thanh điều hướng với tên cửa hàng -->
      <span class="navbar-brand">CỬA HÀNG NỘI THẤT</span>
      <img src="../public/logo.png" alt="Logo" />

      <div id="wrapper">
        <div id="header">
          <nav>
            <!-- Begin menu -->
            <ul id="main-menu">
              <!-- Trang chủ link -->
              <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                  Trang chủ
                </router-link>
              </li>

              <!-- Danh sách sản phẩm link -->
              <li class="nav-item">
                <router-link :to="{ name: 'homepage' }" class="nav-link">
                  Quản lí sản phẩm
                </router-link>
              </li>

              <li class="nav-item">
                <router-link :to="{ name: 'productpage' }" class="nav-link">
                  Sản phẩm
                </router-link>
              </li>

              <!-- Đăng nhập hoặc Đăng xuất -->
              <li class="nav-item">
                <a href="#" class="nav-link" @click="handleAuthClick">
                  {{ isLoggedIn ? "Đăng xuất" : "Đăng nhập" }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Trạng thái đăng nhập
    };
  },
  created() {
    // Xác định trạng thái đăng nhập khi component được khởi tạo
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      // Kiểm tra token để xác định trạng thái đăng nhập
      this.isLoggedIn = !!localStorage.getItem("userToken");
    },
    handleAuthClick() {
      if (this.isLoggedIn) {
        // Xử lý đăng xuất
        localStorage.removeItem("userToken");
        this.isLoggedIn = false; // Cập nhật trạng thái đăng nhập
      } else {
        // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style scoped>
/* CSS tùy chỉnh của navbar */
#main-menu {
  display: flex;
  margin: 0;
  padding: 0;
}

#main-menu li {
  position: relative;
}

#main-menu li a {
  color: #f8f8f8;
  display: block;
  padding: 20px 40px;
}

.navbar {
  width: 100%;
}

.navbar .container-fluid {
  display: flex;
  align-items: center;
}

.navbar-nav {
  display: flex;
}

.nav-item {
  margin-left: 20px;
}

.nav-link {
  color: #fff !important;
}

.navbar-brand {
  font-size: 24px;
  color: #fff;
}
</style>
