<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>


<template>
  <div class="page">
    <AppHeader />
    <div class="container mt-3">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>
