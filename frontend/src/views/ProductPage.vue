<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import productsService from '@/services/products.service';
import MainPagination from '@/components/MainPagination.vue';
import InputSearch from '@/components/InputSearch.vue';

const router = useRouter();
const route = useRoute();
const totalPages = ref(1);

const products = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');
const selectedProduct = computed(() =>
  selectedIndex.value < 0 ? null : filteredProducts.value[selectedIndex.value]
);

const currentPage = computed(() => {
  const page = Number(route.query.page);
  return !Number.isNaN(page) && page > 0 ? page : 1;
});

const { mutate: fetchProducts, isLoading } = useMutation({
  mutationFn: (page) => productsService.fetchProducts(page),
  onSuccess: (chunk) => {
    if (chunk && chunk.products && chunk.metadata) {
      totalPages.value = chunk.metadata.lastPage ?? 1;
      products.value = chunk.products.sort((a, b) => a.ten_sp.localeCompare(b.ten_sp));
    } else {
      products.value = [];
    }
  },
  onError: (error) => {
    console.error('Error fetching products:', error);
  }
});

function changeCurrentPage(page) {
  router.push({ name: 'productpage', query: { page } });
  fetchProducts(page);
}

watch(
  currentPage,
  (newPage) => {
    fetchProducts(newPage);
  },
  { immediate: true }
);

const searchableProducts = computed(() =>
  products.value.map((product) => {
    const { ten_sp, gia_sp } = product;
    return `${ten_sp} ${gia_sp}`;
  })
);

const filteredProducts = computed(() => {
  if (!searchText.value) return products.value;
  return products.value.filter((product, index) =>
    searchableProducts.value[index].toLowerCase().includes(searchText.value.toLowerCase())
  );
});

watch(searchText, () => {
  selectedIndex.value = -1;
});

const formatPrice = (value) => {
  return Number(value).toLocaleString('vi-VN');
};
</script>

<template>
  <div class="container mx-auto mt-12 px-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-gradient">🌟 Danh sách sản phẩm</h1>
      <InputSearch v-model="searchText" class="w-1/3" placeholder="Tìm kiếm sản phẩm..." />
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <p class="text-xl font-semibold text-gray-400">Đang tải sản phẩm...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="isError" class="flex justify-center items-center h-40">
      <p class="text-xl font-semibold text-red-500">Không thể tải sản phẩm. Vui lòng thử lại.</p>
    </div>

    <!-- Product Grid -->
    <div v-else>
      <div class="product-grid">
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id_sp"
          class="product-card hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300"
          @click="selectedIndex = index"
        >
          <img
            :src="product.avatar"
            alt="Product Image"
            class="product-image"
          />
          <div class="mt-4 text-center">
            <p class="text-lg font-bold text-gray-800">{{ product.ten_sp }}</p>
            <p class="text-sm text-gray-500 mt-2">
              Giá: <span class="text-rose-600 font-bold">{{ formatPrice(product.gia_sp) }}đ</span>
            </p>
          </div>
          <button
            class="add-to-cart-btn"
          >
            <i class="fas fa-cart-plus mr-2"></i> Thêm vào giỏ
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-10 flex justify-center w-full">
        <MainPagination
          :total-pages="totalPages"
          :current-page="currentPage"
          @update:current-page="changeCurrentPage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom, #1e293b, #2e3d5b);
  color: #ffffff;
}

.text-gradient {
  background: linear-gradient(to right, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  color: transparent;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  padding: 0 20px;
}

.product-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.add-to-cart-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(to right, #ff8a00, #e52e71);
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-to-cart-btn:hover {
  background: linear-gradient(to right, #e52e71, #ff8a00);
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
