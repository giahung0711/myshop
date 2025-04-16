<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const props = defineProps({
  product: { type: Object, required: true },
});

let avatarFileInput = ref(null);  // Sử dụng ref cho avatarFileInput
let avatarFile = ref(props.product.avatar);
const emit = defineEmits(['submit:product', 'delete:product']);

let validationSchema = toTypedSchema(
  z.object({
    ten_sp: z.string()
      .min(2, { message: 'Tên phải có ít nhất 2 ký tự.' })
      .max(50, { message: 'Tên có nhiều nhất 50 ký tự.' }),
    gia_sp: z.number()
      .int({ message: 'Giá phải là một số nguyên.' }),
    trangthai: z.number().optional(),
    avatarFile: z.instanceof(File).optional(),
  })
);

function previewAvatarFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    avatarFile.value = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function submitProduct(values) {
  let formData = new FormData();
  for (let key in values) {
    if (values[key] !== undefined) {
      formData.append(key, values[key]);
    }
  }
  emit('submit:product', formData);
}

function deleteProduct() {
  emit('delete:product', props.product.id_sp);
}
</script>

<template>
  <Form :validation-schema="validationSchema" @submit="submitProduct">
    <div class="mb-3 w-50 h-50">
      <label for="productImage" class="form-label">Ảnh sản phẩm</label>
      <div v-if="avatarFile" class="position-relative">
        <img
          class="img-fluid "
          :src="avatarFile"
          alt="Product Image"
          style="cursor: pointer;"
        />
      </div>
      <div v-else>
        <button
          type="button"
          class="btn btn-primary"
          @click="avatarFileInput?.click()"
        >
          Chọn ảnh sản phẩm
        </button>
      </div>
      <Field name="avatarFile" v-slot="{ handleChange }">
        <input
          type="file"
          id="productImage"
          class="d-none"
          ref="avatarFileInput"
          @change="(event) => {
            handleChange(event);
            previewAvatarFile(event);
          }"
        />
      </Field>
    </div>

    <div class="mb-3">
      <label for="ten_sp" class="form-label">Tên sản phẩm</label>
      <Field
        name="ten_sp"
        type="text"
        class="form-control"
        :value="product.ten_sp"
      />
      <ErrorMessage name="ten_sp" class="error-feedback" />
    </div>

    <div class="mb-3">
      <label for="gia_sp" class="form-label">Giá</label>
      <Field
        name="gia_sp"
        type="number"
        class="form-control"
        :value="product.gia_sp"
      />
      <ErrorMessage name="gia_sp" class="error-feedback" />
    </div>

    <div class="mb-3 form-check">
      <Field
        name="trangthai"
        type="checkbox"
        class="form-check-input"
        :model-value="product.trangthai"
        :value="1"
        :unchecked-value="0"
      />
      <label for="favorite" class="form-check-label">
        <strong>Sản phẩm yêu thích</strong>
      </label>
    </div>

    <div class="mb-3">
      <button class="btn btn-primary">
        <i class="fas fa-save"></i> Lưu
      </button>
      <button
        v-if="product.id_sp"
        type="button"
        class="ms-2 btn btn-danger"
        @click="deleteProduct"
      >
        <i class="fas fa-trash"></i> Xóa
      </button>
    </div>
  </Form>
</template>

<style scoped>
@import '@/assets/form.css';
</style>
