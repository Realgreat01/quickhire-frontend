<template>
  <QuillEditor
    content-type="html"
    v-model:content="modelValue"
    v-bind="$attrs"
    class="min-h-[200px] bg-white"
  />
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const emits = defineEmits(['update:modelValue', 'input', 'change']);

const modelValue = ref('');

watch(modelValue, (value) => {
  emits('update:modelValue', value);
  emits('change', value);
});
</script>

<style scoped></style>
