<template>
  <div class="homepage">
    <!-- Banner Section -->
    <div class="banner">
      <img src="../public/background.jpg" alt="Banner" class="banner-image" />
      <div class="banner-overlay">
        <h1 class="banner-title">Welcome to Our Store</h1>
        <p class="banner-subtitle">Explore a wide variety of products</p>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Full-width banner section */
.banner {
  position: relative;
  width: 100%;
  height: 100vh; /* Chiều cao banner được đặt để fill toàn bộ chiều cao màn hình */
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Đảm bảo hình ảnh phủ toàn bộ khu vực */
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Overlay đen trong suốt */
}

.banner-title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.banner-subtitle {
  font-size: 1.5rem;
  color: #fff;
}

</style>
