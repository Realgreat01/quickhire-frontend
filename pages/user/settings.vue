<template>
  <div>
    <div class="">
      <div class="flex">
        <h2 class="">Allow Notifications</h2>
        <qh-toggle v-model="checked" />
      </div>
      <div class="flex">
        <h2 class="">CV Template</h2>
        <qh-toggle v-model="checked" />
      </div>
      <div class="flex">
        <h2 class="">Show Education</h2>
        <qh-toggle v-model="checked" />
      </div>
      <div class="flex">
        <h2 class="">Show Summary</h2>
        <qh-toggle v-model="checked" />
      </div>
      <div class="flex">
        <h2 class="">Send Cover Letter</h2>
        <qh-toggle v-model="checked" />
      </div>
    </div>
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
const { basicDetails: user } = storeToRefs(useUserStore());
const modalStore = useModalStore();
</script>

<style scoped></style>
