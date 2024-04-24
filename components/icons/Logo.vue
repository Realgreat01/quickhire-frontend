<template>
  <div class="flex items-center justify-start gap-x-0 rounded p-2">
    <icons-logo-svg :class="class" />
    <span class="qh-text-1 font-geologica" :class="class"> uickHire</span>
  </div>
</template>

<script setup lang="ts">
defineProps({ class: String });
</script>

<style scoped></style>
