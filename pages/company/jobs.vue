<template>
  <div class="">
    <company-jobs />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
});

useHead({
  title: 'QuickHire - Open Applications',
});
</script>

<style scoped></style>
