<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-start gap-2 bg-white pb-4 pt-10"
  >
    <icons-logo class="my-10 text-brand" />
    <RouterLink
      :to="{ name: item.route }"
      :class="item.class"
      class="flex w-60 cursor-pointer rounded p-2 hover:scale-[1.025]"
      v-for="(item, index) in sidebar"
      :key="index"
    >
      <component
        :is="item.icon"
        :class="item.class"
        class="mr-3 h-7 w-7 rounded"
      />
      <h1 class="qh-text-3 font-geologica font-semibold">
        {{ item.title }}
      </h1>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/user-store';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

import {
  RiUser2Fill,
  RiBriefcase2Fill,
  RiBox3Fill,
  RiNotification3Fill,
  RiContactsFill,
  RiSendPlaneFill,
  RiDiscussFill,
  RiSearchFill,
  RiSearchLine,
} from 'vue-remix-icons';
import { useCompanyStore } from '~/store/company-store';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';

import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';
import { useModalStore } from '~/store/modal-store';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';
const { company } = storeToRefs(useCompanyStore());

const modalStore = useModalStore();

const sidebar = markRaw([
  {
    title: 'Profile',
    action: '',
    route: QH_ROUTES.COMPANY.DASHBOARD,
    icon: RiUser2Fill,
    class: 'fill-teal-800  text-teal-800',
  },
  {
    title: 'Open Applications',
    action: '',
    route: QH_ROUTES.COMPANY.JOBS,
    icon: RiBriefcase2Fill,
    class: 'fill-brand  text-brand',
  },
  {
    title: 'Messages',
    action: '',
    route: QH_ROUTES.COMPANY.MESSAGES,
    icon: RiDiscussFill,
    class: 'fill-violet-800  text-violet-800',
  },
  {
    title: 'Find Talents',
    action: '',
    route: QH_ROUTES.COMPANY.TALENTS,
    icon: RiSearchLine,
    class: 'fill-secondary-600  text-secondary-600',
  },

  {
    title: 'Notifications',
    action: '',
    route: QH_ROUTES.COMPANY.NOTIFICATIONS,
    icon: RiNotification3Fill,
    class: 'fill-error-800 text-error-800',
  },

  {
    title: 'Contact',
    action: '',
    route: QH_ROUTES.COMPANY.CONTACT,
    icon: RiContactsFill,
    class: 'fill-cyan-800 text-cyan-800',
  },
]);

async function openLogoutModal() {
  try {
    const result = await modalStore.openModal({
      title: 'Logout ?',
      message: 'Do you really want to logout',
    });
    if (result) {
      qhHelpers.logout();
      qhToast.success('logout successfully');
    }
  } catch (error) {}
}
</script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply rounded-lg bg-brand-600 text-brand-100;
  svg {
    @apply fill-brand-100;
  }
}
</style>
