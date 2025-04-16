<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProductForm from '@/components/ProductForm.vue';
import productsService from '@/services/products.service';
import { useQuery, useMutation } from '@tanstack/vue-query';

const props = defineProps({
  productId: { type: String, required: true }
});

const router = useRouter();
const route = useRoute();
const message = ref('');

const { data: product } = useQuery({
  queryKey: ['product', props.productId],
  queryFn: async () => await productsService.fetchProduct(props.productId),
  onError: (error) => {
    console.log(error);
    router.push({
      name: 'notfound',
      params: { pathMatch: route.path.split('/').slice(1) },
      query: route.query,
      hash: route.hash
    });
  }
});

const { mutate: updateProduct } = useMutation({
  mutationFn: async (product) => {
    const id_sp = props.productId;
    return await productsService.updateProduct(id_sp, product);
  },
  onSuccess: () => {
    message.value = 'Sản phẩm được cập nhật thành công.';
  },
  onError: (error) => {
    console.error('Error updating product:', error);
  }
});

const { mutate: deleteProduct } = useMutation({
  mutationFn: async (id_sp) => {
    return await productsService.deleteProduct(id_sp);
  },
  onSuccess: () => {
    router.push({ name: 'homepage' });
  },
  onError: (error) => {
    console.error('Error deleting product:', error);
  }
});

function onUpdateProduct(product) {
  updateProduct(product);
}

function onDeleteProduct(id_sp) {
  if (confirm('Bạn muốn xóa sản phẩm này?')) {
    deleteProduct(id_sp);
  }
}
</script>

<template>
  <div v-if="product" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ProductForm
      :product="product"
      @submit:product="onUpdateProduct"
      @delete:product="onDeleteProduct"
    />
    <p>{{ message }}</p>
  </div>
</template>
