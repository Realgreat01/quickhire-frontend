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
          :label="settings.portfolio_type"
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
        <qh-toggle v-model="settings.send_cover_letter" />
      </div>
      <qh-button
        class="my-4 rounded-full !py-3 md:w-60"
        @click="updateUserSettings"
        :loading="updating"
        >Save Changes</qh-button
      >
      {{ settings }}
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { QH_ROUTES } from '~/constants/routes';
import { useUserStore } from '~/store/user-store';
import type { Settings as ISettings } from '~/types/user';
definePageMeta({
  layout: 'users',
  middleware: ['auth', 'user'],
  name: QH_ROUTES.USER.SETTINGS,
});

useHead({
  title: 'QuickHire - Settings',
});

const { user: currentUser, updating } = storeToRefs(useUserStore());
const { updateUserDetails } = useUserStore();

const user = computed(() => currentUser.value);

const settings = ref<ISettings>({
  allow_notifications: user.value?.settings.allow_notifications,
  portfolio_type: user.value?.settings.portfolio_type,
  cv_template: user.value?.settings.cv_template,
  show_education: user.value?.settings.show_education,
  send_cover_letter: user.value?.settings.send_cover_letter,
  show_references: user.value?.settings.show_references,
  show_summary: user.value?.settings.show_summary,
});

const updateUserSettings = async () => {
  await updateUserDetails({ settings: settings.value });
};
</script>

<style scoped></style>
