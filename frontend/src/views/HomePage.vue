<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import ProductCard from '@/components/ProductCard.vue';
import productsService from '@/services/products.service';
import InputSearch from '@/components/InputSearch.vue';
import ProductList from '@/components/ProductList.vue';
import MainPagination from '@/components/MainPagination.vue';



const router = useRouter();
const route = useRoute();
const totalPages = ref(1);


// Reactive states
const products = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');
const selectedProduct = computed(() =>
  selectedIndex.value < 0 ? null : filteredProducts.value[selectedIndex.value]
);

// Get the current page from the query string (?page=1)
const currentPage = computed(() => {
  const page = Number(route.query?.page);
  return !Number.isNaN(page) && page > 0 ? page : 1;
});

// Create a searchable string from each product (ten_sp, gia_sp)
const searchableProducts = computed(() =>
  products.value.map((product) => {
    const { ten_sp, gia_sp } = product;
    return `${ten_sp} ${gia_sp}`;
  })
);

// Filter products based on the search text
const filteredProducts = computed(() => {
  if (!searchText.value) return products.value;
  return products.value.filter((product, index) =>
    searchableProducts.value[index].toLowerCase().includes(searchText.value.toLowerCase())
  );
});

// Retrieve products for the specific page and order by ten_sp
const { mutate: fetchProducts, isLoading } = useMutation({
  mutationFn: (page) => productsService.fetchProducts(page),
  onSuccess: (chunk) => {
    console.log(chunk);
    totalPages.value = chunk.metadata.lastPage ?? 1;
    products.value = chunk.products.sort((a, b) => a.ten_sp.localeCompare(b.ten_sp));
    selectedIndex.value = -1;
  },
  onError: (error) => {
    console.error('Error fetching products:', error);
  }
});

// Mutation to delete all products
const mutation = useMutation({
  mutationFn: async () => {
    await productsService.deleteAllProducts();
  },
  onSuccess: () => {
    totalPages.value = 1;
    products.value = [];
    selectedIndex.value = -1;
    changeCurrentPage(1);
    console.log('All products deleted successfully.');
  },
  onError: (error) => {
    console.error('Error deleting all products:', error);
  }
});

async function refreshProducts() {
  await fetchProducts(currentPage.value);
}

// Handle deleting all products
async function onDeleteProducts() {
  if (confirm('Bạn muốn xóa tất cả sản phẩm?')) {
    mutation.mutate();
  }
}

// Navigate to the Add Product page
function goToAddProduct() {
  router.push({ name: 'product.add' });
}

// Change the current page and update the query parameter
function changeCurrentPage(page) {
  router.push({ name: 'homepage', query: { page } });
}

// Watch searchText and reset the selected index
watch(searchText, () => {
  selectedIndex.value = -1;
});

// Fetch products when currentPage changes
watch(
  currentPage,
  () => {
    fetchProducts(currentPage.value);
  },
  { immediate: true }
);
</script>

<template>
  <div class="page row mb-5">
    <div class="mt-3 col-md-6">
      <h4>
        Quản lí sản phẩm
        <i class="fa-solid fa-list"></i>
      </h4>
      <div class="my-3">
        <InputSearch v-model="searchText" />
      </div>
      <ProductList
        v-if="!isLoading && filteredProducts.length > 0"
        :products="filteredProducts"
        v-model:selectedIndex="selectedIndex"
      />
      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 d-flex flex-wrap justify-content-round align-items-center">
        <MainPagination
          :total-pages="totalPages"
          :current-page="currentPage"
          @update:current-page="changeCurrentPage"
        />
        <div class="w-100"></div>
        <button class="btn btn-sm btn-primary" @click="refreshProducts">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddProduct">
          <i class="fas fa-plus"></i> Thêm sản phẩm
        </button>
        <button class="btn btn-sm btn-danger" @click="onDeleteProducts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="selectedProduct">
        <h4>   
          Chi tiết sản phẩm
          <i class="fa-solid fa-cart-shopping"></i>
        </h4>
        <ProductCard :product="selectedProduct" />
        <router-link
          :to="{
            name: 'product.edit',
            params: { id_sp: selectedProduct.id_sp }
          }"
        >
          <span class="mt-2 badge text-bg-warning"> <i class="fas fa-edit"></i> Hiệu chỉnh</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
  background-color: #f9f9f9; /* Màu nền nhạt */
  padding: 20px; /* Tạo khoảng cách bên trong */
  border-radius: 8px; /* Bo tròn góc */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Đổ bóng */
}

body {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); /* Gradient làm nền toàn trang */
  min-height: 100vh;
  margin: 0;
}
</style>
