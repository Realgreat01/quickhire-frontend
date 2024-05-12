<template>
  <div class=""></div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.INDEX,
});

useHead({
  title: 'QuickHire - Company Profile',
});

onMounted(() => navigateTo({ name: QH_ROUTES.COMPANY.DASHBOARD }));
</script>

<style scoped></style>
