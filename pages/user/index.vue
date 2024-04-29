<template>
  <div></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  middleware: ['auth', 'user'],
  layout: 'users',
  name: QH_ROUTES.USER.INDEX,
});

useHead({
  title: 'QuickHire - Account',
});

onMounted(() => navigateTo({ name: QH_ROUTES.USER.PROFILE }));
</script>

<style lang="scss" scoped></style>
