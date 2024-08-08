<template>
  <div class="md:w-4/5">
    <div
      class="flex flex-col gap-6 border-none !bg-transparent !p-0 !px-0 !py-0 !shadow-none md:p-2"
    >
      <qh-card class="relative">
        <h2 class="qh-text-2 my-10 font-bold">Address</h2>
        <qh-edit-button @click="editAddress" />
        <div class="flex flex-col gap-4">
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Country</h2>
            <h2 class="text-brand">{{ user?.address.country }}</h2>
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">State</h2>
            <h2 class="text-brand">{{ user?.address.state ?? 'N/A' }}</h2>
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">City</h2>
            <h2 class="text-brand">{{ user?.address.city ?? 'N/A' }}</h2>
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Street</h2>
            <h2 class="text-brand">{{ user?.address.street ?? 'N/A' }}</h2>
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Area</h2>
            <h2 class="text-brand">{{ user?.address.area ?? 'N/A' }}</h2>
          </div>
        </div>
      </qh-card>
      <qh-card class="relative">
        <h2 class="qh-text-2 my-10 font-bold">Social Links</h2>
        <qh-edit-button @click="editSocialLinks" />
        <div class="flex flex-col gap-4">
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Github</h2>
            <qh-checked :value="Boolean(user?.social_media?.github)" />
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Hashnode</h2>
            <qh-checked :value="Boolean(user?.social_media?.hashnode)" />
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Linkedin</h2>
            <qh-checked :value="Boolean(user?.social_media?.linkedin)" />
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
              X (Formerly Twitter)
            </h2>
            <qh-checked :value="Boolean(user?.social_media?.twitter)" />
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Facebook</h2>
            <qh-checked :value="Boolean(user?.social_media?.facebook)" />
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Twitch</h2>
            <qh-checked :value="Boolean(user?.social_media?.twitch)" />
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Instagram</h2>
            <qh-checked :value="Boolean(user?.social_media?.instagram)" />
          </div>
          <div class="flex justify-between md:justify-normal md:gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Youtube</h2>
            <qh-checked :value="Boolean(user?.social_media?.youtube)" />
          </div>
        </div>
      </qh-card>
    </div>
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
const router = useRouter();
const { user } = storeToRefs(useUserStore());

const editAddress = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.ADDRESS } });
};
const editSocialLinks = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.USER.SOCIAL_LINKS } });
};
</script>

<style scoped></style>
