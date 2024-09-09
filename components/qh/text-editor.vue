<template>
  <QuillEditor
    content-type="html"
    v-model:content="modelValue"
    v-bind="$attrs"
    class="font-poppins min-h-[200px] border border-dark-100 bg-white !text-base"
  />
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const modelValue = defineModel({ default: '' });
</script>

<style scoped></style>
