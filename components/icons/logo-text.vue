<template>
  <div class="flex items-center justify-start gap-x-0 rounded p-2">
    <img src="~/assets/svgs/quickhire-logo.svg" class="h-4 w-4" />
    <span class="qh-text-1 font-geologica" :class="Class">uickHire</span>
  </div>
</template>

<script setup lang="ts">
defineProps({ Class: String });
</script>

<style scoped></style>
