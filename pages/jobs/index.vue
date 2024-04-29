<template>
  <div>
    <jobs-all-jobs />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.JOB.ALL,
});

useHead({
  title: 'QuickHire - Jobs',
});
</script>

<style scoped></style>
