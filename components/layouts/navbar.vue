<template>
  <div class="mb-4 flex flex-col gap-1 bg-white">
    <div class="flex items-center justify-between">
      <h1 class="qh-text-1 mx-4 flex items-center capitalize text-brand-500">
        <icons-logo />
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
        <div class="relative hidden h-10 w-12 md:block">
          <ArrowRightStartOnRectangleIcon
            class="h-8 w-8 fill-error text-error"
            @click="openLogoutModal"
          />
          <p class="">Logout</p>
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
              <h1 class="font-normal">{{ skills?.stack }}</h1>
            </div>
            <div class="my-5">
              <RouterLink
                :to="{ name: item.route }"
                v-for="(item, index) in sidebar"
                :key="index"
              >
                <div
                  @click="item.action"
                  :class="item.class"
                  class="font-geologica flex w-60 cursor-pointer p-1 pl-4 font-semibold hover:scale-[1.025]"
                >
                  <component
                    :is="item.icon"
                    :class="item.class"
                    class="mr-3 h-7 w-7 rounded"
                  />
                  <h1 class="qh-text-3 font-semi">
                    {{ item.title }}
                  </h1>
                </div>
              </RouterLink>
            </div>
          </div>
        </qh-dropdown>
      </div>
    </div>

    <div class="mx-6 flex items-center justify-between">
      <h1 class="qh-text-2 my-4 w-fit font-bold text-brand-800">
        {{ routeNames }}
      </h1>
      <div class="grid grid-cols-2 justify-end gap-x-4 p-4 md:flex">
        <!--  -->
        <div
          v-show="actionButtonPages.includes(route.name as string)"
          @click="() => router.replace({ query: { add: route.meta.name } })"
          class="flex !w-40 cursor-pointer rounded bg-brand p-2 text-brand-100 shadow duration-500 first-line:cursor-pointer hover:scale-[1.025] md:w-60"
        >
          <RiAddCircleFill class="mr-3 h-6 w-6 rounded fill-brand-100" />
          <h1 class="qh-text-3 font-semi">Add</h1>
        </div>

        <!--  -->
        <div
          @click="
            router.replace({
              name: QH_ROUTES.USER.PREVIEW,
              params: { username: basicDetails?.username },
            })
          "
          class="flex !w-40 cursor-pointer rounded bg-brand-100 p-2 text-brand shadow first-line:cursor-pointer hover:scale-[1.025] md:w-60"
        >
          <RiProfileFill class="mr-3 h-6 w-6 rounded fill-brand" />
          <h1 class="qh-text-3 font-semi">Preview</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RiAddCircleFill,
  RiNotification3Fill,
  RiUser2Fill,
  RiBriefcase2Fill,
  RiBox3Fill,
  RiGraduationCapFill,
  RiSendPlaneFill,
  RiProfileFill,
  RiHomeOfficeFill,
  RiSettings4Fill,
  RiContactsFill,
} from 'vue-remix-icons';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';
import { useRoute, useRouter } from 'vue-router';
import { useModalStore } from '~/store/modal-store';
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/user-store';
import { QH_ROUTES } from '~/constants/routes';

const { closeDropdown } = useModalStore();
const { fullname, basicDetails, skills } = storeToRefs(useUserStore());

const route = useRoute();
const router = useRouter();
const modalStore = useModalStore();

const emit = defineEmits(['close-modal']);
const actionButtonPages = ref([
  QH_ROUTES.USER.EDUCATION,
  QH_ROUTES.USER.EXPERIENCE,
  QH_ROUTES.USER.PROJECTS,
]);

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

const routeNames = computed(() => {
  switch (route.name) {
    case QH_ROUTES.USER.DETAILS:
      return 'Profile';
    case QH_ROUTES.USER.EDUCATION:
      return 'Education';
    case QH_ROUTES.USER.WORK_DETAILS:
      return 'Work Details';
    case QH_ROUTES.USER.CONTACT:
      return 'Contact Details';
    case QH_ROUTES.USER.SETTINGS:
      return 'Settings';
    case QH_ROUTES.USER.PROJECTS:
      return 'Projects';
    case QH_ROUTES.USER.EXPERIENCE:
      return 'Experience';
    case QH_ROUTES.USER.APPLIED_JOBS:
      return 'Current Applications';
    case QH_ROUTES.JOB.ALL:
      return 'Latest Jobs';
    case QH_ROUTES.JOB.SINGLE:
      return 'Job Board';
    default:
      return null;
  }
});

const sidebar = markRaw([
  {
    title: 'Profile',
    action: closeDropdown,
    route: QH_ROUTES.USER.DETAILS,
    icon: RiUser2Fill,
    class: 'fill-teal-600  text-teal-600',
  },
  {
    title: 'Education',
    action: closeDropdown,
    route: QH_ROUTES.USER.EDUCATION,
    icon: RiGraduationCapFill,
    class: 'fill-brand  text-brand',
  },
  {
    title: 'Work Details',
    action: closeDropdown,
    route: QH_ROUTES.USER.WORK_DETAILS,
    icon: RiBriefcase2Fill,
    class: 'fill-cyan-800  text-cyan-800',
  },

  {
    title: 'Experience',
    action: closeDropdown,
    route: QH_ROUTES.USER.EXPERIENCE,
    icon: RiHomeOfficeFill,
    class: 'fill-blue-800  text-blue-800',
  },
  {
    title: 'Applied Jobs',
    action: closeDropdown,
    route: QH_ROUTES.USER.APPLIED_JOBS,
    icon: RiSendPlaneFill,
    class: 'fill-violet-800  text-violet-800',
  },

  {
    title: 'Projects',
    action: closeDropdown,
    route: QH_ROUTES.USER.PROJECTS,
    icon: RiBox3Fill,
    class: 'fill-indigo-800  text-indigo-800',
  },
  {
    title: 'Contact',
    action: closeDropdown,
    route: QH_ROUTES.USER.CONTACT,
    icon: RiContactsFill,
    class: 'fill-cyan-800  text-cyan-800',
  },
  {
    title: 'Settings',
    action: closeDropdown,
    route: QH_ROUTES.USER.SETTINGS,
    icon: RiSettings4Fill,
    class: 'fill-dark-400  text-dark-400',
  },

  {
    title: 'Logout',
    action: openLogoutModal,
    route: '',
    icon: ArrowRightStartOnRectangleIcon,
    class: 'fill-error-800  text-error-800',
  },
]);
</script>

<style lang="scss" scoped></style>
