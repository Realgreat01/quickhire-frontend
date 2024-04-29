<template>
  <div class="">
    <company-jobs />
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.JOBS,
});

useHead({
  title: 'QuickHire - Open Applications',
});
</script>

<style scoped></style>
