<script setup>
defineProps({
  product: { type: Object, required: true },
});
</script>
<template>
  <div>
    <div class="p-1 w-75 h-75">
      <img class="img-fluid img-thumbnail" :src="product.avatar" alt="" />
    </div>
    <div class="p-1">
      <strong>Tên sản phẩm:</strong>
      {{ product.ten_sp }}
    </div>
    <div class="p-1">
      <strong>Giá:</strong>
      {{ product.gia_sp }}
    </div>
    <div class="p-1">
      <strong>Sản phẩm yêu thích:&nbsp;</strong>
      <i v-if="product.trangthai" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div>
  </div>
</template>