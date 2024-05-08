<template>
  <div>
    <div class="">
      <h1 class="qh-text-3 capitalize">
        Experience Level : {{ user?.experience_level }} Level
      </h1>
    </div>
    <div class="">
      <h1 class="qh-text-3 capitalize">rate : {{ user?.rate }} per Hour</h1>
    </div>
    <div class="">
      <h1 class="qh-text-3 capitalize">
        Higest Education Level : {{ user?.highest_education_level }}
      </h1>
    </div>
    <div class="">
      <h1 class="qh-text-3 capitalize">
        Interest Job : {{ user?.interest_job }}
      </h1>
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
  name: QH_ROUTES.USER.WORK_DETAILS,
});

useHead({
  title: 'QuickHire - Work Details',
});
const { basicDetails: user } = storeToRefs(useUserStore());
const modalStore = useModalStore();
</script>

<style scoped></style>
