<script setup>
import { ref } from 'vue';
import ProductForm from '@/components/ProductForm.vue';
import productsService from '@/services/products.service';
import { useMutation } from '@tanstack/vue-query';

const newProduct = ref({
  ten_sp: '',
  gia_sp: '',
  trangthai: 0,
  avatarFile: null
});
const message = ref('');

const mutation = useMutation({
  mutationFn: async (newProduct) => {
    await productsService.createProduct(newProduct);
  },
  onSuccess: () => {
    message.value = 'Sản phẩm được thêm thành công!';
  },
  onError: () => {
    message.value = 'Lỗi khi thêm sản phẩm';
  }
});

async function onAddProduct(product) {
  await mutation.mutateAsync(product);
}
</script>
<template>
  <div class="page">
    <h4>Thêm sản phẩm mới</h4>
    <ProductForm :product="newProduct" @submit:product="onAddProduct" />
    <p>{{ message }}</p>
  </div>
</template>
