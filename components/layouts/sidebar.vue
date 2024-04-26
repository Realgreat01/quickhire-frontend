<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-center gap-2 bg-white"
  >
    <div
      class="font-poppins my-10 flex h-60 w-max flex-col items-center justify-center rounded-2xl border-2 border-dark-50 bg-dark-50 p-8 shadow-md"
    >
      <img
        class="block h-32 w-32 rounded-full border border-brand"
        src="~/assets/images/company-logo.jpg"
        alt=""
      />
      <h1 class="font-semibold capitalize">{{ fullname }}</h1>
      <h1 class="qh-text-4 text-brand">@{{ basicDetails?.username }}</h1>
      <h1 class="font-normal">Fullstack Developer</h1>
    </div>
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
  RiCodeSSlashFill,
  RiGraduationCapFill,
  RiContactsFill,
  RiSendPlaneFill,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';

const { fullname, basicDetails } = storeToRefs(useUserStore());

const sidebar = markRaw([
  {
    title: 'Profile',
    action: '',
    route: QH_CONSTANTS.DETAILS,
    icon: RiUser2Fill,
    class: 'fill-teal-600  text-teal-600',
  },
  {
    title: 'Education',
    action: '',
    route: QH_CONSTANTS.EDUCATION,
    icon: RiGraduationCapFill,
    class: 'fill-brand  text-brand',
  },
  {
    title: 'Experience',
    action: '',
    route: QH_CONSTANTS.EXPERIENCE,
    icon: RiBriefcase2Fill,
    class: 'fill-pink-800  text-pink-800',
  },
  {
    title: 'Applied Jobs',
    action: '',
    route: QH_CONSTANTS.JOBS,
    icon: RiSendPlaneFill,
    class: 'fill-violet-800  text-violet-800',
  },
  // {
  //   title: 'Stacks',
  //   action: '',
  //   route: QH_CONSTANTS.STACKS,
  //   icon: RiCodeSSlashFill,
  //   class: 'fill-purple-600  text-purple-600',
  // },
  {
    title: 'Projects',
    action: '',
    route: QH_CONSTANTS.PROJECTS,
    icon: RiBox3Fill,
    class: 'fill-indigo-800  text-indigo-800',
  },

  // {
  //   title: 'Contact',
  //   action: '',
  //   route: QH_CONSTANTS.CONTACT,
  //   icon: RiContactsFill,
  //   class: 'fill-cyan-800  text-cyan-800',
  // },
]);
</script>

<style scoped></style>
