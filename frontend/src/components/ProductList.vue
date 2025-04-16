<script setup>
defineProps({
  products: { type: Array, default: () => [] },
  selectedIndex: { type: Number, default: -1 }
});
const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
  <div class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="(product, index) in products"
      :key="product.id_sp"
      :class="['product-card', index === selectedIndex ? 'border-blue-500 shadow-lg' : '']"
      class="bg-white border rounded-lg p-4 hover:shadow-md transition"
      @click="$emit('update:selectedIndex', index)"
    >
      <div class="product-info">
        <h3 class="text-lg font-semibold mb-1">{{ product.ten_sp }}</h3>
        <div class="text-blue-600 font-bold">{{ product.gia_sp.toLocaleString() }} đ</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  margin: 20px 0;
}
.product-card {
  cursor: pointer;
  border-width: 1px;
}
.product-card:hover {
  transform: translateY(-5px);
}
</style>
