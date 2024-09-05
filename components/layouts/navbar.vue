<template>
  <div class="mb-4 flex flex-col gap-1 bg-white">
    <div class="flex items-center justify-between">
      <h1 class="qh-text-1 mx-4 flex items-center capitalize text-brand-500">
        <icons-logo />
      </h1>

      <div class="flex gap-x-3 p-4">
        <qh-theme-changer />
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

        <qh-dropdown
          class="md:hidden"
          v-slot="{ closeDropdown }"
          deactivateClickOutside
        >
          <div class="min-w-60 p-0">
            <qh-card
              class="font-poppins relative mb-4 flex max-h-80 w-full flex-col items-center justify-center bg-brand text-white"
            >
              <qh-edit-button class="text-white" @click="editProfile" />
              <div class="relative block" v-if="user?.profile_picture">
                <img
                  :src="user?.profile_picture"
                  alt=""
                  class="lazy block h-28 w-28 rounded-[50%] border-2 border-white p-1"
                />
                <qh-edit-button
                  @click="uploadProfilePicture"
                  class="right-1 top-1 rounded-lg bg-brand fill-white p-1 text-white"
                />
                <!-- class="!left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 transform text-brand" -->
              </div>
              <h1 class="qh-text-4 w-full text-center font-semibold capitalize">
                {{ fullname }}
              </h1>
              <h1 class="text-center text-xs text-secondary-500">
                @{{ user?.username }}
              </h1>
              <h1 class="qh-text-5 text-center font-medium">
                {{ skills?.stack }}
              </h1>

              <qh-button
                @click="previewprofile"
                variant="inverse"
                class="my-2 h-8 items-center gap-x-4 border border-brand"
              >
                <h1 class="qh-text-4 font-medium">Portfolio</h1>
                <arrow-top-right-on-square-icon
                  class="h-5 w-5 rounded text-brand"
                />
              </qh-button>

              <qh-resume-button
                variant="outlined"
                :username="user?.username ?? ''"
                class="qh-text-4 h-8 w-max rounded-full !border-white px-8 !text-white"
              />
            </qh-card>
            <div class="my-5">
              <RouterLink
                @click="closeDropdown"
                :to="{ name: nav?.route }"
                class="router flex w-full cursor-pointer p-1 py-[6px] pl-4 font-bold hover:scale-[1.025]"
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
                @click="openLogoutModal"
              >
                <ArrowRightStartOnRectangleIcon
                  class="mr-3 h-5 w-5 fill-error text-error"
                />
                <h1 class="qh-text-4 font-normal">Logout</h1>
              </div>
            </div>
          </div>
        </qh-dropdown>
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
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
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
import { useUploadStore } from '~/store/upload-store';
import { UPDATE_USER_PROFILE_PICTURE } from '~/services/user.service';

const currentRoute = useRoute();
const uploadStore = useUploadStore();
const { fullname, user, skills } = storeToRefs(useUserStore());
const { getCurrentUser } = useUserStore();
const router = useRouter();
const modalStore = useModalStore();

const editProfile = () => {
  return router.replace({ query: { edit: QH_ROUTES.USER.PROFILE } });
};

const emit = defineEmits(['close-modal']);

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

const uploadProfilePicture = async () => {
  try {
    const result = await uploadStore.openModal();
    if (result) {
      const formData = new FormData();
      formData.append('profile_picture', result[0]);
      const res = await UPDATE_USER_PROFILE_PICTURE(formData);
      if (res.success) {
        getCurrentUser();
        qhToast.success('update successful');
        uploadStore.uploadComplete();
      } else {
        qhToast.error('picture update failed');
        uploadStore.uploadFailed();
        uploadProfilePicture();
      }
    }
  } catch (error) {
    console.log('user upload cancelled');
  }
};

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
