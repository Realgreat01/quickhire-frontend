<template>
  <div class="md:w-4/5">
    <qh-card
      class="flex flex-col gap-6 !bg-transparent !p-0 !px-0 !py-0 !shadow-none md:p-2"
    >
      <qh-card class="relative border border-dark-50">
        <h2 class="qh-text-2 my-10 font-bold">Address</h2>
        <qh-edit-button @click="editAddress" />
        <div class="flex flex-col gap-4">
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Country</h2>
            <h2 class="text-brand">{{ company?.address.country }}</h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">State</h2>
            <h2 class="text-brand">{{ company?.address.state }}</h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">City</h2>
            <h2 class="text-brand">{{ company?.address.city ?? 'N/A' }}</h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Street</h2>
            <h2 class="text-brand">{{ company?.address.street ?? 'N/A' }}</h2>
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Area</h2>
            <h2 class="text-brand">{{ company?.address.area ?? 'N/A' }}</h2>
          </div>
        </div>
      </qh-card>
      <qh-card class="relative">
        <h2 class="qh-text-2 my-10 font-bold">Social Links</h2>
        <qh-edit-button @click="editSocialLinks" />
        <div class="flex flex-col gap-4">
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Github</h2>
            <qh-checked :value="Boolean(company?.social_media?.github)" />
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Hashnode</h2>
            <qh-checked :value="Boolean(company?.social_media?.hashnode)" />
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Linkedin</h2>
            <qh-checked :value="Boolean(company?.social_media?.linkedin)" />
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
              X (Formerly Twitter)
            </h2>
            <qh-checked :value="Boolean(company?.social_media?.twitter)" />
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Facebook</h2>
            <qh-checked :value="Boolean(company?.social_media?.facebook)" />
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Twitch</h2>
            <qh-checked :value="Boolean(company?.social_media?.twitch)" />
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Instagram</h2>
            <qh-checked :value="Boolean(company?.social_media?.instagram)" />
          </div>
          <div class="flex gap-x-20">
            <h2 class="qh-text-4 max-w-40 font-medium md:w-60">Youtube</h2>
            <qh-checked :value="Boolean(company?.social_media?.youtube)" />
          </div>
        </div>
      </qh-card>
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { useCompanyStore } from '~/store/company-store';

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.CONTACT,
});

useHead({
  title: 'QuickHire - Contact',
});
const router = useRouter();
const { company } = storeToRefs(useCompanyStore());

const editAddress = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.COMPANY.ADDRESS } });
};
const editSocialLinks = (id: string) => {
  router.replace({ query: { edit: QH_ROUTES.COMPANY.SOCIAL_LINKS } });
};
</script>

<style scoped></style>
