<template>
  <div class="md:w-4/5">
    <qh-card class="flex flex-col gap-y-6">
      <div class="flex items-center justify-between gap-x-20">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
          Allow Notifications
        </h2>
        <qh-toggle v-model="settings.allow_notifications" />
      </div>
      <div class="flex items-center justify-between gap-x-20">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
          Portfolio Template
        </h2>
        <qh-button
          class="disabled w-fit cursor-not-allowed rounded-lg !bg-dark-50 !py-1 capitalize !text-dark"
          :label="settings.portfolio_template"
        />
      </div>
      <div class="flex items-center justify-between gap-x-20">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">CV Template</h2>
        <qh-button
          class="disabled w-fit cursor-not-allowed rounded-lg !bg-dark-50 !py-1 capitalize !text-dark"
          :label="settings.cv_template"
        />
      </div>
      <div class="flex items-center justify-between gap-x-20">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
          Show Education on Portfolio
        </h2>
        <qh-toggle v-model="settings.show_education" />
      </div>
      <div class="flex items-center justify-between gap-x-20">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
          Show Summary on CV
        </h2>
        <qh-toggle v-model="settings.show_summary" />
      </div>
      <div class="flex items-center justify-between gap-x-20">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
          Show References on CV
        </h2>
        <qh-toggle v-model="settings.show_references" />
      </div>
      <div class="flex items-center justify-between gap-x-20">
        <h2 class="qh-text-4 max-w-40 font-medium md:w-60">
          Send Cover Letter
        </h2>
        <qh-toggle v-model="checked" />
      </div>

      <qh-button class="my-4 rounded-full !py-3 md:w-60" disabled
        >Save Changes</qh-button
      >
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon } from '@heroicons/vue/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { RiWebhookFill, RiGithubFill, RiGlobalLine } from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import { useModalStore } from '~/store/modal-store';

definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.SETTINGS,
});

useHead({
  title: 'QuickHire - Settings',
});
const checked = ref(true);
const mate = ref(false);
const { user } = storeToRefs(useUserStore());

const settings = ref({
  allow_notifications: true,
  portfolio_template: 'default',
  cv_template: 'default',
  show_education: false,
  show_references: false,
  show_summary: true,
});
</script>

<style scoped></style>
