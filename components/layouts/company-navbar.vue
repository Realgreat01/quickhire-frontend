<template>
  <div class="relative bg-white">
    <div
      :style="style"
      class="relative flex h-36 w-full items-start justify-between bg-cover bg-right md:justify-end"
    >
      <qh-edit-button class="!top-28" @click="updateCoverImage" />
      <h1
        class="qh-text-1 flex items-center capitalize text-brand-500 md:hidden"
      >
        <icons-logo />
      </h1>
      <div class="flex gap-x-3 p-4">
        <div class="relative hidden h-10 w-12 md:block">
          <ArrowRightStartOnRectangleIcon
            class="h-8 w-8 fill-error text-error"
            @click="openLogoutModal"
          />
        </div>
        <qh-dropdown class="z-50 md:hidden">
          <div class="">
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
    <div class="bg-brand-50 pb-4">
      <div class="relative flex h-24">
        <div class="relative">
          <img
            :src="company?.logo"
            alt=""
            class="relative bottom-10 z-40 ml-4 h-20 w-20 rounded border border-dark-200 bg-white object-contain p-4 md:bottom-20 md:h-40 md:w-40"
          />
          <qh-edit-button
            class="!-right-2 !-top-[4.5rem] z-50"
            @click="updateLogo"
          />
        </div>
        <div
          class="my-4 flex h-fit w-full items-center justify-between px-4 md:px-8"
        >
          <div class="">
            <h1 class="qh-text-2 font-bold text-brand">
              {{ company?.company_name }}
            </h1>
            <h1 class="qh-text-4 font-medium text-dark">
              Company ID: {{ company?.company_id }}
            </h1>
            <h1 class="qh-text-4 font-medium text-dark">
              {{ company?.address.country }}
            </h1>
          </div>
          <qh-button
            class="qh-text-4 h-8 rounded-full md:h-12 md:!px-16"
            @click="createJob"
            >Post&nbsp;New&nbsp;Job</qh-button
          >
        </div>
      </div>
      <h1
        class="qh-text-2 bg-secondary-1000 mx-4 hidden font-bold text-brand-600"
      >
        {{ routeNames }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';
import {
  RiUser2Fill,
  RiBriefcase2Fill,
  RiSearchLine,
  RiContactsFill,
  RiDiscussFill,
} from 'vue-remix-icons';

import { useModalStore } from '~/store/modal-store';
import { useCompanyStore } from '~/store/company-store';
import { useUploadStore } from '~/store/upload-store';
import { UPDATE_COVER_IMAGE, UPDATE_LOGO } from '~/services/company.service';
const { company } = storeToRefs(useCompanyStore());

const modalStore = useModalStore();
const uploadStore = useUploadStore();
const { getCurrentCompany } = useCompanyStore();

const router = useRouter();
const route = useRoute();

const style = computed(() => {
  return {
    backgroundImage: `url(${company.value?.cover_image})`,
  };
});

const createJob = () => {
  return router.replace({ query: { action: QH_ROUTES.JOB.CREATE_JOB } });
};

const updateCoverImage = async () => {
  try {
    const result = await uploadStore.openModal();
    if (result) {
      const formData = new FormData();
      formData.append('cover-image', result[0]);
      const res = await UPDATE_COVER_IMAGE(formData);
      if (res.success) {
        getCurrentCompany();
        qhToast.success('update successful');
        uploadStore.uploadComplete();
      } else {
        qhToast.error('cover image update failed');
        uploadStore.uploadFailed();
        updateCoverImage();
      }
    }
  } catch (error) {}
};

const updateLogo = async () => {
  try {
    const result = await uploadStore.openModal();
    if (result) {
      const formData = new FormData();
      formData.append('logo', result[0]);

      const res = await UPDATE_LOGO(formData);
      if (res.success) {
        getCurrentCompany();
        qhToast.success('update successful');
        uploadStore.uploadComplete();
      } else {
        qhToast.error('logo update failed');
        uploadStore.uploadFailed();
        updateLogo();
      }
    }
  } catch (error) {}
};

const sidebar = markRaw([
  {
    title: 'Profile',
    action: '',
    route: QH_ROUTES.COMPANY.DASHBOARD,
    icon: RiUser2Fill,
    class: 'fill-teal-800  text-teal-800',
  },
  {
    title: 'Open Applications',
    action: '',
    route: QH_ROUTES.COMPANY.ALL_JOBS,
    icon: RiBriefcase2Fill,
    class: 'fill-brand  text-brand',
  },
  {
    title: 'Messages',
    action: '',
    route: QH_ROUTES.COMPANY.DASHBOARD,
    icon: RiDiscussFill,
    class: 'fill-violet-800  text-violet-800',
  },
  {
    title: 'Find Talents',
    action: '',
    route: QH_ROUTES.JOB.ALL,
    icon: RiSearchLine,
    class: 'fill-secondary-600  text-secondary-600',
  },

  {
    title: 'Contact',
    action: '',
    route: QH_ROUTES.COMPANY.ALL_JOBS,
    icon: RiContactsFill,
    class: 'fill-cyan-800 text-cyan-800',
  },
  {
    title: 'Logout',
    action: openLogoutModal,
    route: '',
    icon: ArrowRightStartOnRectangleIcon,
    class: 'fill-error-800  text-error-800',
  },
]);

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
    case QH_ROUTES.COMPANY.DASHBOARD:
      return '';
    case QH_ROUTES.COMPANY.CONTACT:
      return 'Contact';
    case QH_ROUTES.COMPANY.MESSAGES:
      return 'Messages';
    case QH_ROUTES.COMPANY.TALENTS:
      return 'Talents';
    case QH_ROUTES.COMPANY.ALL_JOBS:
      return 'Applications';
    case QH_ROUTES.COMPANY.NOTIFICATIONS:
      return 'Notifications';
    default:
      return null;
  }
});
</script>

<style scoped></style>
