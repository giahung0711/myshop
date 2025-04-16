<script setup>
import { defineProps, defineEmits } from 'vue';

// Định nghĩa props cho v-model
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

// Định nghĩa sự kiện để cập nhật giá trị khi người dùng nhập
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control px-3"
      placeholder="Nhập sản phẩm cần tìm"
      :value="props.modelValue"  
      @input="$emit('update:modelValue', $event.target.value)"  
    />
    <button class="btn btn-outline-secondary" type="button" @click="$emit('submit')">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>
