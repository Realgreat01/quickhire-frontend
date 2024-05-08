<template>
  <div class="">
    <h2 class="">{{ user?.address }}</h2>
    <h2 class="">{{ user?.social_media }}</h2>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.CONTACT,
});

useHead({
  title: 'QuickHire - Contact',
});

const { basicDetails: user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
