<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-start gap-2 bg-white pb-4 pt-10"
  >
    <icons-logo class="my-10 text-brand" />
    <RouterLink
      :to="{ name: routeName }"
      class="router flex w-52 cursor-pointer p-1 py-[6px] pl-4 font-bold hover:scale-[1.025]"
      v-for="{
        class: className,
        icon,
        route: routeName,
        title,
        path,
      } in sidebar"
      :class="
        route.name === routeName || route.path.includes(path)
          ? className
          : 'text-dark-400'
      "
      :key="routeName"
    >
      <component :is="icon" class="mr-3 h-5 w-5 rounded" />
      <h1 class="qh-text-4 font-normal">
        {{ title }}
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
const route = useRoute();

const modalStore = useModalStore();

const sidebar = markRaw([
  {
    title: 'Profile',
    action: '',
    path: '/dashboard',
    route: QH_ROUTES.COMPANY.DASHBOARD,
    icon: RiUser2Fill,
    class: '!bg-teal-100  text-teal-800',
  },
  {
    title: 'Applications',
    action: '',
    path: '/jobs',
    route: QH_ROUTES.COMPANY.ALL_JOBS,
    icon: RiBriefcase2Fill,
    class: '!bg-brand-100 text-brand',
  },
  {
    title: 'Messages',
    action: '',
    path: '/messages',
    route: QH_ROUTES.COMPANY.MESSAGES,
    icon: RiDiscussFill,
    class: '!bg-violet-100  text-violet-800',
  },
  {
    title: 'Find Talents',
    action: '',
    path: '/talents',
    route: QH_ROUTES.COMPANY.TALENTS,
    icon: RiSearchLine,
    class: '!bg-secondary-100  text-secondary-600',
  },

  {
    title: 'Notifications',
    action: '',
    path: '/notifications',
    route: QH_ROUTES.COMPANY.NOTIFICATIONS,
    icon: RiNotification3Fill,
    class: '!bg-error-100 text-error-800',
  },

  {
    title: 'Contact',
    action: '',
    path: '/contact',
    route: QH_ROUTES.COMPANY.CONTACT,
    icon: RiContactsFill,
    class: '!bg-cyan-100 text-cyan-800',
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
// .router-link-active {
//   @apply rounded-lg bg-brand-600 text-brand-100;
//   svg {
//     @apply !bg-brand-100;
//   }
// }
</style>
