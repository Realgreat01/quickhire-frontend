<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-center gap-2 bg-white px-1"
  >
    <qh-card
      class="font-poppins relative my-10 flex h-60 w-full flex-col items-center justify-center border-2 !border-dark-50"
    >
      <qh-edit-button class="text-dark" @click="editProfile" />
      <img
        class="m-2 block h-32 w-32 rounded-full border border-brand"
        :src="basicDetails?.profile_picture"
        alt=""
      />
      <h1 class="qh-text-3 font-semibold capitalize">{{ fullname }}</h1>
      <h1 class="text-xs text-brand">@{{ basicDetails?.username }}</h1>
      <h1 class="qh-text-4 font-normal">{{ skills?.stack }}</h1>
    </qh-card>

    <RouterLink
      :to="{ name: item.route }"
      :class="item.class"
      class="font-geologica flex w-60 cursor-pointer p-1 pl-4 font-semibold hover:scale-[1.025]"
      v-for="(item, index) in sidebar"
      :key="index"
    >
      <component
        :is="item.icon"
        :class="item.class"
        class="mr-3 h-7 w-7 rounded"
      />
      <h1 class="qh-text-3 font-semi">
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
  RiGraduationCapFill,
  RiSendPlaneFill,
  RiSettings4Fill,
  RiHomeOfficeFill,
  RiContactsFill,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { QH_ROUTES } from '~/constants/routes';

const { fullname, basicDetails, skills } = storeToRefs(useUserStore());
const editProfile = () => {
  return router.replace({ query: { edit: QH_ROUTES.USER.PROFILE } });
};
const sidebar = markRaw([
  {
    title: 'Profile',
    action: '',
    route: QH_ROUTES.USER.DETAILS,
    icon: RiUser2Fill,
    class: 'fill-teal-600  text-teal-600',
  },
  {
    title: 'Education',
    action: '',
    route: QH_ROUTES.USER.EDUCATION,
    icon: RiGraduationCapFill,
    class: 'fill-brand  text-brand',
  },
  {
    title: 'Work Details',
    action: '',
    route: QH_ROUTES.USER.WORK_DETAILS,
    icon: RiBriefcase2Fill,
    class: 'fill-cyan-800  text-cyan-800',
  },

  {
    title: 'Experience',
    action: '',
    route: QH_ROUTES.USER.EXPERIENCE,
    icon: RiHomeOfficeFill,
    class: 'fill-blue-800  text-blue-800',
  },
  {
    title: 'Applied Jobs',
    action: '',
    route: QH_ROUTES.USER.APPLIED_JOBS,
    icon: RiSendPlaneFill,
    class: 'fill-violet-800  text-violet-800',
  },

  {
    title: 'Projects',
    action: '',
    route: QH_ROUTES.USER.PROJECTS,
    icon: RiBox3Fill,
    class: 'fill-indigo-800  text-indigo-800',
  },
  {
    title: 'Contact',
    action: '',
    route: QH_ROUTES.USER.CONTACT,
    icon: RiContactsFill,
    class: 'fill-cyan-800  text-cyan-800',
  },
  {
    title: 'Settings',
    action: '',
    route: QH_ROUTES.USER.SETTINGS,
    icon: RiSettings4Fill,
    class: 'fill-dark-800  text-dark-800',
  },
]);
</script>

<style scoped></style>
