import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';

// Hàm kiểm tra trạng thái đăng nhập
const isLoggedIn = () => {
  return !!localStorage.getItem('userToken'); // Kiểm tra xem userToken có tồn tại không
};

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginRegister.vue')
  },
  {
    path: '/',
    name: 'homepage',
    component: HomePage,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next();
      } else {
        alert('Bạn cần đăng nhập để truy cập trang này!');
        next({ name: 'login' });
      }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/productpage',
    name: 'productpage',
    component: () => import('@/views/ProductPage.vue'),
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next();
      } else {
        alert('Bạn cần đăng nhập để truy cập trang này!');
        next({ name: 'login' });
      }
    }
  },
  {
    path: '/products/:id_sp',
    name: 'product.edit',
    component: () => import('@/views/ProductEdit.vue'),
    props: (route) => ({ productId: route.params.id_sp }),
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next();
      } else {
        alert('Bạn cần đăng nhập để truy cập trang này!');
        next({ name: 'login' });
      }
    }
  },
  {
    path: '/products',
    name: 'product.add',
    component: () => import('@/views/ProductAdd.vue'),
    props: (route) => ({ productId: route.params.id_sp }),
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next();
      } else {
        alert('Bạn cần đăng nhập để truy cập trang này!');
        next({ name: 'login' });
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
