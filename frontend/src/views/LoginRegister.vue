<template>
  <div class="login-register">
    <div class="form-container">
      <h1>{{ isRegistering ? "Create an Account" : "Welcome Back" }}</h1>
      <p>{{ isRegistering ? "Sign up to get started!" : "Login to continue!" }}</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="u_acc">Username:</label>
          <input
            v-model="form.u_acc"
            type="text"
            id="u_acc"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="acc_pwd">Password:</label>
          <input
            v-model="form.acc_pwd"
            type="password"
            id="acc_pwd"
            placeholder="Enter your password"
            required
          />
        </div>

        <div v-if="isRegistering">
          <div class="form-group">
            <label for="u_name">Name:</label>
            <input
              v-model="form.u_name"
              type="text"
              id="u_name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div class="form-group">
            <label for="u_phone">Phone:</label>
            <input
              v-model="form.u_phone"
              type="text"
              id="u_phone"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div class="form-group">
            <label for="u_add_street">Street:</label>
            <input
              v-model="form.u_add_street"
              type="text"
              id="u_add_street"
              placeholder="Enter your street"
            />
          </div>

          <div class="form-group">
            <label for="u_add_city">City:</label>
            <input
              v-model="form.u_add_city"
              type="text"
              id="u_add_city"
              placeholder="Enter your city"
            />
          </div>
        </div>

        <button type="submit" class="btn">
          {{ isRegistering ? "Register" : "Login" }}
        </button>
      </form>

      <div class="toggle-section">
        <p>
          {{ isRegistering
            ? "Already have an account? "
            : "Don't have an account yet? " }}
          <span @click="toggleMode" class="toggle-link">
            {{ isRegistering ? "Login" : "Register" }}
          </span>
        </p>
      </div>

      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRegistering: false,
      form: {
        u_acc: "",
        acc_pwd: "",
        u_name: "",
        u_phone: "",
        u_add_street: "",
        u_add_district: "",
        u_add_city: "",
        u_add_province: "",
      },
      message: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const endpoint = this.isRegistering
          ? "/api/v1/user/register"
          : "/api/v1/user/login";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        });

        const result = await response.json();
        if (response.ok) {
          if (!this.isRegistering) {
            // Lưu trạng thái đăng nhập
            localStorage.setItem("userToken", result.user.u_acc); // Hoặc một token nếu backend trả về
            this.message = "Đăng nhập thành công!";
            
            // Chuyển hướng đến trang 'productpage' sau khi đăng nhập thành công
            this.$router.push({ name: "productpage" }).then(() => {
              // Chắc chắn rằng Vue Router đã chuyển hướng thành công
              // Sau khi chuyển hướng, ta có thể refresh lại trang nếu cần
              window.location.reload(); // Làm mới trang nếu cần thiết
            });
          } else {
            this.message = "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.";
            this.isRegistering = false; // Chuyển sang trạng thái đăng nhập
          }
        } else {
          this.message = result.message || "Đã xảy ra lỗi!";
        }
      } catch (error) {
        this.message = "Lỗi hệ thống. Vui lòng thử lại!";
      }
    },
  },
  methods: {
  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.message = ""; // Xóa thông báo khi chuyển chế độ
    this.resetForm(); // Đặt lại form nếu cần
  },
  resetForm() {
    // Đặt lại giá trị các trường trong form
    this.form = {
      u_acc: "",
      acc_pwd: "",
      u_name: "",
      u_phone: "",
      u_add_street: "",
      u_add_district: "",
      u_add_city: "",
      u_add_province: "",
    };
  },
  async handleSubmit() {
    try {
      const endpoint = this.isRegistering
        ? "/api/v1/user/register"
        : "/api/v1/user/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });

      const result = await response.json();
      if (response.ok) {
        if (!this.isRegistering) {
          localStorage.setItem("userToken", result.user.u_acc);
          this.message = "Đăng nhập thành công!";
          this.$router.push({ name: "productpage" }).then(() => {
            window.location.reload();
          });
        } else {
          this.message = "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.";
          this.isRegistering = false; // Chuyển sang trạng thái đăng nhập
        }
      } else {
        this.message = result.message || "Đã xảy ra lỗi!";
      }
    } catch (error) {
      this.message = "Lỗi hệ thống. Vui lòng thử lại!";
    }
  },
},
};

</script>





<style scoped>
/* Base styling */
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  font-family: 'Arial', sans-serif;
}

/* Form container */
.form-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
  color: #666;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  text-align: left;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #2575fc;
  outline: none;
}

/* Button styling */
.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background: #2575fc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #1a5bbf;
}

/* Toggle section */
.toggle-section {
  margin-top: 20px;
}

.toggle-link {
  color: #2575fc;
  cursor: pointer;
  font-weight: bold;
}

.toggle-link:hover {
  text-decoration: underline;
}

/* Message */
.message {
  color: #d9534f;
  margin-top: 15px;
}
</style>
