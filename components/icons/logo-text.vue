<template>
  <div class="flex items-center justify-start gap-x-0 rounded p-2">
    <icons-logo-svg :class="Class" />
    <span class="qh-text-1 font-geologica" :class="Class"> uickHire</span>
  </div>
</template>

<script setup lang="ts">
defineProps({ Class: String });
</script>

<style scoped></style>
