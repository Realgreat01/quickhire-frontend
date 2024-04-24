<template>
  <div>
    <home-header class="px-10" />
    <home-main-page class="px-10" />
    <home-features class="px-10" />
    <home-stats class="px-10" />
    <home-current-listings class="px-10" />
    <home-testimonials class="px-10" />
    <home-footer class="px-10" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '',
});

useHead({
  title: 'QuickHire - Home',
});
</script>

<style lang="scss" scoped></style>
