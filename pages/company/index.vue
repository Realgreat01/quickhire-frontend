<template>
  <div class="">
    <company-info />
    <!-- <company-jobs /> -->
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.DASHBOARD,
});

useHead({
  title: 'QuickHire - Company Profile',
});
</script>

<style scoped></style>
