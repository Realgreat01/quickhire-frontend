<template>
  <div class="card p-4" :class="Class" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({ Class: String });
</script>

<style scoped></style>
