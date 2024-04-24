<template>
  <div class="card" :class="class" v-bind="$attrs">
    <div v-if="imageSrc" class="card-image">
      <img :src="imageSrc" :alt="imageAlt" />
    </div>
    <div class="card-body">
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="content">{{ content }}</p>
      <!-- Slot for custom content -->
      <slot></slot>
    </div>
    <div v-if="footerContent" class="card-footer">
      {{ footerContent }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, type PropType } from 'vue';
defineProps({
  title: String,
  content: String,
  imageSrc: String,
  component: { type: Object as PropType<Component> },
  imageAlt: {
    type: String,
    default: 'card-image',
  },

  footerContent: String,
  class: String,
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
}

.card-body {
  padding: 20px;
  text-align: center;
}

.card-footer {
  text-align: center;
  padding: 10px;
  font-size: 0.9rem;
  background: #f8f8f8;
}
</style>
