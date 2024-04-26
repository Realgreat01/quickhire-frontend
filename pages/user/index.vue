<template>
  <div></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
});

useHead({
  title: 'QuickHire - Account',
});

onMounted(() => navigateTo(QH_ROUTES.USER.PROFILE));
</script>

<style lang="scss" scoped></style>
