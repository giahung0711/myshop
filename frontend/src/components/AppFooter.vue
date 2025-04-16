<template>
  <footer class="footer bg-dark text-white text-center text-lg-start">
    <div class="container p-4">
      <!-- Section: About -->
      <section class="mb-4">
        <h6 class="text-uppercase fw-bold">Về Chúng Tôi</h6>
        <p>
          Chúng tôi cam kết cung cấp sản phẩm tốt nhất cho khách hàng. Đừng ngần ngại liên hệ nếu bạn cần hỗ trợ!
        </p>
      </section>

      <!-- Section: Links -->
      <section class="d-flex justify-content-center mb-4">
        <a
          href="https://facebook.com"
          class="btn btn-outline-light btn-floating m-1"
          target="_blank"
          role="button"
          aria-label="Facebook"
        >
          <i class="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://twitter.com"
          class="btn btn-outline-light btn-floating m-1"
          target="_blank"
          role="button"
          aria-label="Twitter"
        >
          <i class="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          class="btn btn-outline-light btn-floating m-1"
          target="_blank"
          role="button"
          aria-label="Instagram"
        >
          <i class="fab fa-instagram"></i>
        </a>
        <a
          href="mailto:support@example.com"
          class="btn btn-outline-light btn-floating m-1"
          role="button"
          aria-label="Email"
        >
          <i class="fas fa-envelope"></i>
        </a>
      </section>

      <!-- Section: Links -->
      <section class="">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h6 class="text-uppercase">Thông Tin</h6>
            <ul class="list-unstyled mb-0">
              <li><a href="#" class="text-white text-decoration-none">Về Chúng Tôi</a></li>
              <li><a href="#" class="text-white text-decoration-none">Điều Khoản</a></li>
              <li><a href="#" class="text-white text-decoration-none">Chính Sách</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h6 class="text-uppercase">Hỗ Trợ</h6>
            <ul class="list-unstyled mb-0">
              <li><a href="#" class="text-white text-decoration-none">FAQs</a></li>
              <li><a href="#" class="text-white text-decoration-none">Hỗ Trợ Trực Tuyến</a></li>
              <li><a href="#" class="text-white text-decoration-none">Liên Hệ</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h6 class="text-uppercase">Sản Phẩm</h6>
            <ul class="list-unstyled mb-0">
              <li><a href="#" class="text-white text-decoration-none">Sản Phẩm Mới</a></li>
              <li><a href="#" class="text-white text-decoration-none">Giảm Giá</a></li>
              <li><a href="#" class="text-white text-decoration-none">Bán Chạy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h6 class="text-uppercase">Liên Lạc</h6>
            <ul class="list-unstyled mb-0">
              <li>
                <i class="fas fa-home me-2"></i> Đường 3/2, Thành phố Cần Thơ
              </li>
              <li>
                <i class="fas fa-phone me-2"></i> +84 123 456 789
              </li>
              <li>
                <i class="fas fa-envelope me-2"></i> support@example.com
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2024 Bản quyền thuộc về:
      <a class="text-white fw-bold text-decoration-none" href="https://example.com" target="_blank">
        Nguyễn Lê Gia Hưng
      </a>
    </div>
  </footer>
</template>

<script setup>
// Không cần logic cụ thể cho Footer
</script>

<style scoped>
.footer {
  position: relative;
  width: 100%;
}
.footer h6 {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.footer ul {
  padding: 0;
  list-style: none;
}
.footer ul li {
  margin-bottom: 0.5rem;
}
.footer ul li i {
  margin-right: 0.5rem;
}
</style>
