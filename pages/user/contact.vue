<template>
  <div class="md:w-4/5">
    <qh-card
      class="flex flex-col gap-6 !bg-transparent !p-0 !px-0 !py-0 !shadow-none md:p-2"
    >
      <qh-card class="relative border border-dark-50">
        <h2 class="qh-text-2 my-10 font-bold">Address</h2>
        <qh-edit-button />
        <div class="flex flex-col gap-4">
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Country</h2>
            <h2 class="text-brand">{{ user?.address.country }}</h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">State</h2>
            <h2 class="text-brand">{{ user?.address.state }}</h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">City</h2>
            <h2 class="text-brand">{{ user?.address.city ?? 'N/A' }}</h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Street</h2>
            <h2 class="text-brand">{{ user?.address.street ?? 'N/A' }}</h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Area</h2>
            <h2 class="text-brand">{{ user?.address.area ?? 'N/A' }}</h2>
          </div>
        </div>
      </qh-card>
      <qh-card class="relative">
        <h2 class="qh-text-2 my-10 font-bold">Social Links</h2>
        <qh-edit-button />
        <div class="flex flex-col gap-4">
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Github</h2>
            <h2 class="text-brand">
              {{ user?.social_media?.github ?? 'N/A' }}
            </h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Hashnode</h2>
            <h2 class="text-brand">
              {{ user?.social_media?.hashnode ?? 'N/A' }}
            </h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Linkedin</h2>
            <h2 class="text-brand">
              {{ user?.social_media?.linkedin ?? 'N/A' }}
            </h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
              X (Formerly Twitter)
            </h2>
            <h2 class="text-brand">
              {{ user?.social_media?.twitter ?? 'N/A' }}
            </h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Facebook</h2>
            <h2 class="text-brand">
              {{ user?.social_media?.facebook ?? 'N/A' }}
            </h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Twitch</h2>
            <h2 class="text-brand">
              {{ user?.social_media?.twitch ?? 'N/A' }}
            </h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Instagram</h2>
            <h2 class="text-brand">
              {{ user?.social_media?.instagram ?? 'N/A' }}
            </h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Youtube</h2>
            <h2 class="text-brand">
              {{ user?.social_media?.youtube ?? 'N/A' }}
            </h2>
          </div>
        </div>
      </qh-card>
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
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

const { user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
