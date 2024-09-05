<template>
  <div class="bg-white p-2">
    <div class="mx-auto bg-white">
      <user-profile-dashboard />
      <div class="my-10 grid gap-4 gap-x-10 md:grid-cols-2">
        <jobs-active-applications :count="2" />
        <jobs-recommendations :count="4" />
      </div>
      <div
        class="my-20 grid items-start justify-start gap-6 md:grid-cols-[3fr,2fr]"
      >
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
