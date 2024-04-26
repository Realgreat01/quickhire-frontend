<template>
  <div class="">
    <company-info />
    <company-jobs />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'company',
  middleware: 'auth',
});

useHead({
  title: 'QuickHire - Projects',
});
</script>

<style scoped></style>
