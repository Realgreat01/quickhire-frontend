<template>
  <div class="card p-4" :class="Class" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({ Class: String });
</script>

<style scoped>
.card {
  border: 1px solid #edeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px #e8e8e8;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 5px 15px #7d7d7d4c;
    /* @apply shadow-brand; */
  }
}
</style>
