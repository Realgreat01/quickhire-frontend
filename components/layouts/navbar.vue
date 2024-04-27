<template>
  <div class="mb-4 flex flex-col gap-4 bg-dark-50">
    <div class="flex items-center justify-between">
      <h1 class="qh-text-1 m-4 flex items-center capitalize text-brand-500">
        <icons-logo />
        <!-- <span class="block !font-bold"
          >| {{ route.meta.name ?? 'Dashboard' }}</span
        > -->
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
            @click="openNotificationModal"
          />
          <span
            class="qh-flex-center absolute bottom-6 right-0 h-5 w-5 rounded-full border border-white bg-error text-center text-[10px] text-white"
            >10</span
          >
        </div>

        <qh-dropdown class="md:hidden">
          <div class="">
            <div
              class="font-poppins flex h-60 w-max flex-col items-center justify-center rounded-2xl border-2 border-dark-50 bg-dark-50 p-8 shadow-md"
            >
              <img
                class="block h-32 w-32 rounded-full border border-brand"
                src="~/assets/images/user-profile.jpg"
                alt=""
              />
              <h1 class="font-semibold capitalize">{{ fullname }}</h1>
              <h1 class="qh-text-4 text-brand">
                @{{ basicDetails?.username }}
              </h1>
              <h1 class="font-normal">Fullstack Developer</h1>
            </div>
            <div class="my-5">
              <RouterLink
                :to="{ name: item.route }"
                @click="qhDropdown.close"
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
          </div>
        </qh-dropdown>
      </div>
    </div>

    <div
      class="flex w-full justify-end gap-x-4 p-4"
      v-if="!route.meta.name?.includes(SpecailPages)"
    >
      <div
        :class="item.class"
        @click="item.action"
        class="flex w-48 cursor-pointer rounded p-2 shadow hover:scale-[1.025] md:w-60"
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
  RiUser2Fill,
  RiBriefcase2Fill,
  RiBox3Fill,
  RiCodeSSlashFill,
  RiGraduationCapFill,
  RiContactsFill,
  RiSendPlaneFill,
  RiProfileFill,
} from 'vue-remix-icons';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';
import QH_CONSTANTS from '~/constants';
import { useRoute, useRouter } from 'vue-router';
import { useModalStore } from '~/store/modal-store';
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/user-store';
const { fullname, basicDetails } = storeToRefs(useUserStore());

const route = useRoute();
const router = useRouter();
const modalStore = useModalStore();

const emit = defineEmits(['close-modal']);
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
async function openNotificationModal() {
  try {
    const result = await modalStore.openModal();
    if (result) {
      console.log('User chose to continue! to check notification');
      // Handle continue operation here
    }
  } catch (error) {
    console.log('User cancelled notification:', error);
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

<style lang="scss" scoped></style>
