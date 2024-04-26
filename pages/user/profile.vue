<template>
  <div class=""><user-dashboard /></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
  middleware: 'auth',
  name: QH_CONSTANTS.DETAILS,
});

useHead({
  title: 'QuickHire - Dashboard',
});

const { projects } = storeToRefs(useUserStore());
</script>

<style scoped></style>
