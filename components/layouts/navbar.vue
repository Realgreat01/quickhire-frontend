<template>
  <div class="mb-4 flex flex-col gap-4 bg-dark-50">
    <h1 class="qh-text-1 m-4 capitalize">
      {{ QH_CONSTANTS.APP_NAME }} | {{ route.meta.name }}
    </h1>
    <div class="">
      <div alt="" class="h-20 w-full bg-brand"></div>
    </div>

    <div class="flex w-full justify-end gap-x-4 p-4">
      <div
        :class="item.class"
        @click="item.action"
        class="flex w-60 cursor-pointer rounded p-2 shadow hover:scale-[1.025]"
        v-for="(item, index) in navbar"
        :key="index"
      >
        <component
          :is="item.icon"
          :class="item.class"
          class="mr-3 h-6 w-6 rounded"
        />
        <h1 class="qh-text-3 font-semi">
          {{ item.title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RiAddCircleFill,
  // RiEditBoxFill,
  // RiDeleteBin6Fill,
  RiProfileFill,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const navbar = markRaw([
  {
    title: 'Add',
    action: () => router.replace({ query: { add: route.meta.name } }),
    route: '',
    icon: RiAddCircleFill,
    class: 'fill-green-600 bg-green-200 text-green-600',
  },
  {
    title: 'Preview',
    action: () => router.replace({ query: { edit: route.meta.name } }),
    route: '',
    icon: RiProfileFill,
    class: 'fill-brand-600 bg-brand-200 text-brand-600',
  },
]);
</script>

<style lang="scss" scoped></style>
