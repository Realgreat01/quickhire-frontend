<template>
  <div
    class="sticky bottom-0 top-0 flex h-screen flex-col items-center justify-center gap-2 bg-dark-50 pb-4 pt-10"
  >
    <div class="mt-10 flex w-full flex-col items-center justify-center">
      <!-- <qh-circle :value="80"> -->
      <image :src="basicDetails?.profile_picture" class="m-4 h-32" />
      <!-- </qh-circle> -->
      <h1 class="capitalize">{{ fullname }}</h1>
      <h1 class="text-brand">@{{ basicDetails?.username }}</h1>
      <h1 class="">FullStack Developer</h1>
    </div>
    <RouterLink
      :to="{ name: item.route }"
      :class="item.class"
      class="flex w-60 cursor-pointer rounded border p-2 hover:scale-[1.025]"
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
    class: 'fill-teal-800 bg-teal-200 text-teal-800',
  },
  {
    title: 'Education',
    action: '',
    route: QH_CONSTANTS.EDUCATION,
    icon: RiGraduationCapFill,
    class: 'fill-brand-500 bg-brand-200 text-brand',
  },
  {
    title: 'Experience',
    action: '',
    route: QH_CONSTANTS.EXPERIENCE,
    icon: RiBriefcase2Fill,
    class: 'fill-pink-800 bg-pink-200 text-pink-800',
  },
  {
    title: 'Applied Jobs',
    action: '',
    route: QH_CONSTANTS.JOBS,
    icon: RiSendPlaneFill,
    class: 'fill-green-800 bg-green-200 text-green-800',
  },
  {
    title: 'Stacks',
    action: '',
    route: QH_CONSTANTS.STACKS,
    icon: RiCodeSSlashFill,
    class: 'fill-purple-600 bg-purple-200 text-purple-600',
  },
  {
    title: 'Projects',
    action: '',
    route: QH_CONSTANTS.PROJECTS,
    icon: RiBox3Fill,
    class: 'fill-indigo-800 bg-indigo-200 text-indigo-800',
  },

  {
    title: 'Contact',
    action: '',
    route: QH_CONSTANTS.CONTACT,
    icon: RiContactsFill,
    class: 'fill-cyan-800 bg-cyan-200 text-cyan-800',
  },
]);
</script>

<style scoped></style>
