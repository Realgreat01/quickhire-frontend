<template>
  <div>
    <jobs-all-jobs />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';

definePageMeta({
  layout: 'users',
  // middleware: ['auth', 'user'],
  // name: QH_ROUTES.JOB,
});

useHead({
  title: 'QuickHire - Jobs',
});
</script>

<style scoped></style>
