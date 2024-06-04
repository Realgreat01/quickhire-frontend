<template>
  <div class="qh-flex-center h-fit w-full" :class="Class">
    <div class="qh-flex-center w-2/3 flex-col gap-0 rounded-lg">
      <img src="~~/assets/svgs/no-data-animate.svg" class="max-h-80" alt="" />
      <p class="qh-text-3 text-center font-bold text-dark-400">
        <slot>{{ message }}</slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: { type: String, default: 'No Data Available' },
  Class: { type: String },
});
</script>

<style scoped></style>
