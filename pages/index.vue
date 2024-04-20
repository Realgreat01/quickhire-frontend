<template>
  <div class="px-10">
    <home-header />
    <home-main-page />
    <home-steps />
    <home-footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "",
});

useHead({
  title: "QuickHire - Home",
});
</script>

<style lang="scss" scoped></style>
