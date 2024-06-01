<template>
  <div class="mb-4 flex flex-col gap-1 bg-white">
    <div class="flex items-center justify-between">
      <h1 class="qh-text-1 mx-4 flex items-center capitalize text-brand-500">
        <icons-logo />
      </h1>

      <div class="flex gap-x-3 p-4">
        <qh-dropdown class="mx-3 hidden">
          <template #icon>
            <div class="relative h-10 w-10">
              <ChatBubbleBottomCenterTextIcon class="h-8 w-8 fill-brand" />
              <span
                class="qh-flex-center absolute bottom-6 right-0 h-5 w-5 rounded-full border border-white bg-error text-center text-[10px] text-white"
                >{{ chatHistory.length }}</span
              >
            </div>
          </template>
          <qh-messages class="!w-96" />
        </qh-dropdown>

        <qh-dropdown class="mx-3 hidden">
          <template #icon
            ><div class="relative h-10 w-10">
              <RiNotification3Fill class="h-8 w-8 fill-brand" />
              <span
                class="qh-flex-center absolute bottom-6 right-0 h-5 w-5 rounded-full border border-white bg-error text-center text-[10px] text-white"
                >10</span
              >
            </div>
          </template>
          <qh-notifications class="!w-96" />
        </qh-dropdown>
        <div class="relative hidden h-10 w-12 md:block">
          <ArrowRightStartOnRectangleIcon
            class="h-8 w-8 fill-error text-error"
            @click="openLogoutModal"
          />
          <p class="">Logout</p>
        </div>

        <qh-dropdown class="md:hidden">
          <div class="min-w-60">
            <div
              class="font-poppins flex h-60 w-full flex-col items-center justify-center rounded-lg bg-brand p-8 text-dark-100 shadow-md"
            >
              <qh-edit-button class="text-dark" @click="editProfile" />
              <img
                class="block h-32 w-32 rounded-full border border-brand object-cover"
                :src="user?.profile_picture"
                alt=""
              />
              <h1 class="text-center text-sm font-semibold capitalize">
                {{ fullname }}
              </h1>
              <h1 class="qh-text-4 text-error-300">@{{ user?.username }}</h1>
              <h1 class="qh-text-4 font-medium">{{ skills?.stack }}</h1>
            </div>
            <div class="my-5">
              <RouterLink
                v-for="{
                  class: className,
                  route: routeName,
                  icon,
                  title,
                  action,
                } in navbar"
                :to="{ name: routeName }"
                class="router flex w-full cursor-pointer p-1 pl-4 font-bold hover:scale-[1.025]"
                :class="
                  route.name === routeName || route.path.includes(routeName)
                    ? className
                    : 'text-dark-400'
                "
                :key="routeName"
                @click="action"
              >
                <component :is="icon" class="mr-3 h-5 w-5 rounded" />
                <h1 class="qh-text-4 font-normal">
                  {{ title }}
                </h1>
              </RouterLink>
            </div>
          </div>
        </qh-dropdown>
      </div>
    </div>

    <div class="mx-2 flex items-center justify-between md:mx-6">
      <h1
        class="qh-text-1 font-bebas my-4 w-fit p-4 font-bold text-success-600"
      >
        {{ routeNames }}
      </h1>
      <div class="flex justify-end gap-2 md:flex md:gap-x-4 md:p-4">
        <!--  -->
        <qh-button
          class="h-8 md:w-28"
          v-show="actionButtonPages.includes(route.name as string)"
          @click="() => router.replace({ query: { add: route.meta.name } })"
        >
          <RiAddCircleLine class="h-6 w-6 rounded fill-white" />
          <!-- <h1 class="qh-text-4 font-normal"></h1> -->
        </qh-button>

        <!--  -->
        <qh-button
          @click="previewprofile"
          class="h-8 border border-brand !bg-transparent !text-brand md:w-28"
        >
          <RiEyeLine class="h-6 w-6 rounded fill-brand" />
          <!-- <h1 class="qh-text-4 font-medium"></h1> -->
        </qh-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RiAddCircleFill,
  RiProfileFill,
  RiAddCircleLine,
  RiProfileLine,
  RiEyeLine,
  RiNotification3Fill,
  RiUser2Line,
  RiBriefcase2Line,
  RiBox3Line,
  RiGraduationCapLine,
  RiSendPlaneLine,
  RiSettings4Line,
  RiHomeOfficeLine,
  RiContactsLine,
  RiUser2Fill,
  RiBriefcase2Fill,
  RiBox3Fill,
  RiGraduationCapFill,
  RiSendPlaneFill,
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
import chatHistory from '~/data/chats.json';

const { closeDropdown } = useModalStore();
const { fullname, user, skills } = storeToRefs(useUserStore());

const route = useRoute();
const router = useRouter();
const modalStore = useModalStore();

const editProfile = () => {
  return router.replace({ query: { edit: QH_ROUTES.USER.PROFILE } });
};

const emit = defineEmits(['close-modal']);
const actionButtonPages = ref([
  QH_ROUTES.USER.EDUCATION,
  QH_ROUTES.USER.EXPERIENCE,
  QH_ROUTES.USER.PROJECTS,
]);

const previewprofile = () => {
  router.replace({
    name: QH_ROUTES.USER.PREVIEW,
    params: { username: user.value?.username },
  });
};

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

const navbar = markRaw([
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
