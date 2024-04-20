<template>
  <div>{{ basicDetails }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/user-store';
const { basicDetails } = storeToRefs(useUserStore());

definePageMeta({
  layout: 'users',
});

useHead({
  title: 'QuickHire - Account',
});
</script>

<style lang="scss" scoped></style>
