<template>
  <div class="mb-4 flex flex-col gap-4 bg-dark-50">
    <div class="flex items-center justify-between">
      <h1 class="qh-text-1 m-4 capitalize">
        {{ QH_CONSTANTS.APP_NAME }} | {{ route.meta.name ?? 'Dashboard' }}
      </h1>
      <qh-button class="mr-4 px-8" @click="openModalAndHandleResponse"
        >Post A Job</qh-button
      >
    </div>
    <!-- <div class="">
      <div alt="" class="h-20 w-full bg-brand-50">
        Date : <qh-date-picker /> Date :
        <qh-input type="number" label="currency" name="currency" />
      </div>
    </div> -->

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
import { useModalStore } from '~/store/modal-store';

const route = useRoute();
const router = useRouter();
const modalStore = useModalStore();

async function openModalAndHandleResponse() {
  try {
    const result = await modalStore.openModal();
    if (result) {
      console.log('User chose to continue!');
      // Handle continue operation here
    }
  } catch (error) {
    console.log('User cancelled the operation:', error);
    // Handle cancel operation here
  }
}

const navbar = markRaw([
  {
    title: 'Add',
    action: () => router.replace({ query: { add: route.meta.name } }),
    route: '',
    icon: RiAddCircleFill,
    class: 'fill-success bg-success-100 text-success',
  },
  {
    title: 'Preview',
    action: () => router.replace({ query: { edit: route.meta.name } }),
    route: '',
    icon: RiProfileFill,
    class: 'fill-brand bg-brand-100 text-brand',
  },
]);
</script>

<style lang="scss" scoped></style>
