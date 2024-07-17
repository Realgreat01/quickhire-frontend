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
                :to="{ name: nav?.route }"
                class="router flex w-52 cursor-pointer p-1 py-[6px] pl-4 font-bold hover:scale-[1.025]"
                v-for="nav in UserNavigations"
                :class="
                  currentRoute.name === nav.route ||
                  currentRoute.path.includes(nav?.route)
                    ? nav.class
                    : 'text-dark-400'
                "
                :key="nav.route"
              >
                <component :is="nav.icon" class="mr-3 h-5 w-5 rounded" />
                <h1 class="qh-text-4 font-normal">
                  {{ nav.title }}
                </h1>
              </RouterLink>
              <div
                class="router flex w-52 cursor-pointer p-1 py-[6px] pl-4 font-bold hover:scale-[1.025]"
              >
                <ArrowRightStartOnRectangleIcon
                  class="mr-3 h-5 w-5 fill-error text-error"
                  @click="openLogoutModal"
                />
                <h1 class="qh-text-4 font-normal">Logout</h1>
              </div>
            </div>
          </div>
        </qh-dropdown>
      </div>
    </div>

    <div class="mx-2 flex items-center justify-between md:mx-6">
      <h1
        class="qh-text-1 font-bebas my-4 w-fit p-4 font-bold text-secondary-600"
      >
        {{ routeNames }}
      </h1>
      <div class="flex justify-end gap-2 md:flex md:gap-x-4 md:p-4">
        <!--  -->
        <qh-button
          class="h-8 md:w-28"
          v-show="actionButtonPages.includes(currentRoute.name as string)"
          @click="
            () => router.replace({ query: { add: currentRoute.meta.name } })
          "
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
  RiAddCircleLine,
  RiEyeLine,
  RiNotification3Fill,
} from 'vue-remix-icons';
import {
  ArrowRightStartOnRectangleIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/outline';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';
import { useRoute, useRouter } from 'vue-router';
import { useModalStore } from '~/store/modal-store';
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/user-store';
import { QH_ROUTES } from '~/constants/routes';
import chatHistory from '~/data/chats.json';
import { UserNavigations } from './user-navigations';

const { fullname, user, skills } = storeToRefs(useUserStore());

const currentRoute = useRoute();
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
  switch (currentRoute.name) {
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
</script>

<style lang="scss" scoped></style>
