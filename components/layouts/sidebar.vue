<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-center gap-2 bg-white px-2"
  >
    <qh-card
      class="font-poppins relative my-4 flex h-60 w-full flex-col items-center justify-center border-2 !border-dark-50"
    >
      <qh-edit-button class="text-dark" @click="editProfile" />
      <img
        class="m-2 block h-32 w-32 rounded-full border border-brand"
        :src="user?.profile_picture"
        alt=""
      />
      <h1 class="qh-text-4 w-full text-center font-semibold capitalize">
        {{ fullname }}
      </h1>
      <h1 class="text-center text-xs text-brand">@{{ user?.username }}</h1>
      <h1 class="qh-text-5 text-center font-medium">
        {{ skills?.stack }}
      </h1>
    </qh-card>

    <RouterLink
      :to="{ name: routeName }"
      class="router flex w-52 cursor-pointer p-1 py-[6px] pl-4 font-bold hover:scale-[1.025]"
      v-for="{ class: className, icon, route: routeName, title } in sidebar"
      :class="
        route.name === routeName || route.path.includes(routeName)
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
  RiUser2Line,
  RiBriefcase2Line,
  RiBox3Line,
  RiGraduationCapLine,
  RiSendPlaneLine,
  RiSettings4Line,
  RiHomeOfficeLine,
  RiContactsLine,

  // RiUser2Fill,
  // RiBriefcase2Fill,
  // RiBox3Fill,
  // RiGraduationCapFill,
  // RiSendPlaneFill,
  // RiSettings4Fill,
  // RiHomeOfficeFill,
  // RiContactsFill,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';

const { fullname, user, skills } = storeToRefs(useUserStore());
const editProfile = () => {
  return router.replace({ query: { edit: QH_ROUTES.USER.PROFILE } });
};
const route = useRoute();
const sidebar = markRaw([
  {
    title: 'Profile',
    action: '',
    route: QH_ROUTES.USER.DETAILS,
    icon: RiUser2Line,
    class: 'bg-teal-100  text-teal-600',
  },
  {
    title: 'Education',
    action: '',
    route: QH_ROUTES.USER.EDUCATION,
    icon: RiGraduationCapLine,
    class: '!bg-brand-100  text-brand-600',
  },
  {
    title: 'Work Details',
    action: '',
    route: QH_ROUTES.USER.WORK_DETAILS,
    icon: RiBriefcase2Line,
    class: 'bg-cyan-100  text-cyan-800',
  },

  {
    title: 'Experience',
    action: '',
    route: QH_ROUTES.USER.EXPERIENCE,
    icon: RiHomeOfficeLine,
    class: 'bg-blue-100  text-blue-800',
  },
  {
    title: 'Applied Jobs',
    action: '',
    route: QH_ROUTES.USER.APPLIED_JOBS,
    icon: RiSendPlaneLine,
    // active: route?.name.includes(QH_ROUTES.USER.APPLIED_JOBS),
    class: 'bg-violet-100  text-violet-800',
  },

  {
    title: 'Projects',
    action: '',
    route: QH_ROUTES.USER.PROJECTS,
    icon: RiBox3Line,
    class: 'bg-indigo-100  text-indigo-800',
  },
  {
    title: 'Contact',
    action: '',
    route: QH_ROUTES.USER.CONTACT,
    icon: RiContactsLine,
    class: 'bg-cyan-100  text-cyan-800',
  },
  {
    title: 'Settings',
    action: '',
    route: QH_ROUTES.USER.SETTINGS,
    icon: RiSettings4Line,
    class: 'bg-dark-100  text-dark-500',
  },
]);
</script>

<style scoped lang="scss">
// .router {
//   @apply text-dark-400;
//   svg {
//     @apply bg-dark-100;
//   }
// }

// .router-link-exact-active {
//   @apply rounded-lg border text-brand-600;
//   svg {
//     @apply bg-brand-100;
//   }
// }
</style>
