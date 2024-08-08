<template>
  <div class="bg-white">
    <div class="mx-auto bg-white">
      <user-profile-dashboard />
      <div class="my-10 grid grid-cols-2 gap-x-10">
        <jobs-active-applications :count="2" />
        <jobs-recommendations />
      </div>
      <div class="my-20 grid gap-6 md:grid-cols-[3fr,2fr]">
        <user-profile-about-me />
        <user-profile-skills />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.PROFILE,
});

useHead({
  title: 'QuickHire - Profile',
});
</script>

<style scoped></style>
