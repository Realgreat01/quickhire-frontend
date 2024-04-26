<template>
  <div class="mb-4 flex flex-col gap-4 bg-dark-50">
    <div class="flex items-center justify-between">
      <h1 class="qh-text-1 m-4 flex items-center capitalize text-brand-500">
        <icons-logo />
        <span class="block !font-bold"
          >| {{ route.meta.name ?? 'Dashboard' }}</span
        >
      </h1>
      <div class="flex gap-x-3 p-4">
        <div class="relative h-10 w-10">
          <ChatBubbleBottomCenterTextIcon
            class="h-8 w-8 fill-brand"
            @click="openModalAndHandleResponse"
          />
          <span
            class="qh-flex-center absolute bottom-6 right-0 h-5 w-5 rounded-full border border-white bg-error text-center text-[10px] text-white"
            >10</span
          >
        </div>
        <div class="relative h-10 w-10">
          <RiNotification3Fill
            class="h-8 w-8 fill-brand"
            @click="openModalAndHandleResponse"
          />
          <span
            class="qh-flex-center absolute bottom-6 right-0 h-5 w-5 rounded-full border border-white bg-error text-center text-[10px] text-white"
            >10</span
          >
        </div>
      </div>
    </div>

    <div
      class="flex w-full justify-end gap-x-4 p-4"
      v-if="!route.meta.name?.includes(SpecailPages)"
    >
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
  RiChat3Line,
  RiDiscussFill,
  RiNotification3Fill,
  // RiDeleteBin6Fill,
  RiProfileFill,
} from 'vue-remix-icons';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';
import QH_CONSTANTS from '~/constants';
import { useRoute, useRouter } from 'vue-router';
import { useModalStore } from '~/store/modal-store';

const route = useRoute();
const router = useRouter();
const modalStore = useModalStore();

const SpecailPages = ref(QH_CONSTANTS.DETAILS);
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
