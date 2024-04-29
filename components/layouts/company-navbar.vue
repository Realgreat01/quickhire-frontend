<template>
  <div class="relative">
    <div
      class="flex h-36 w-full items-start justify-between bg-[url('~/assets/images/office-image.jpg')] bg-cover bg-right md:justify-end"
    >
      <h1
        class="qh-text-1 flex items-center capitalize text-brand-500 md:hidden"
      >
        <icons-logo />
      </h1>
      <div class="flex gap-x-3 p-4">
        <div class="relative h-10 w-10">
          <ChatBubbleBottomCenterTextIcon
            class="h-8 w-8 fill-brand"
            @click=""
          />
          <span
            class="qh-flex-center absolute bottom-6 right-0 h-5 w-5 rounded-full border border-white bg-error text-center text-[10px] text-white"
            >10</span
          >
        </div>
        <div class="relative h-10 w-10">
          <RiNotification3Fill class="h-8 w-8 fill-brand" @click="" />
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
    <div class="relative flex h-24 bg-brand-50">
      <img
        src="~/assets/images/company-logo.jpg"
        alt=""
        class="relative bottom-10 z-50 ml-4 h-20 w-20 rounded border border-dark-200 bg-white md:bottom-20 md:h-40 md:w-40"
      />
      <div
        class="my-4 flex h-fit w-full items-center justify-between px-4 md:px-8"
      >
        <div class="">
          <h1 class="qh-text-2 font-bold text-brand">
            {{ currentCompany?.company_name }}
          </h1>
          <h1 class="qh-text-4 font-medium text-dark">
            {{ currentCompany?.company_location }}
          </h1>
        </div>
        <qh-button
          class="qh-text-4 h-8 rounded-full md:h-12 md:!px-16"
          @click="createJob"
          >Post&nbsp;New&nbsp;Job</qh-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompanyStore } from '~/store/company-store';
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';
import {
  RiNotification3Fill,
  RiUser2Fill,
  RiBriefcase2Fill,
  RiBox3Fill,
  RiGraduationCapFill,
  RiContactsFill,
  RiSendPlaneFill,
  RiDiscussFill,
  RiSearchFill,
  RiSearchLine,
} from 'vue-remix-icons';
import { useModalStore } from '~/store/modal-store';
const { currentCompany } = storeToRefs(useCompanyStore());

const modalStore = useModalStore();

const router = useRouter();

const createJob = () => {
  return router.replace({ query: { action: QH_ROUTES.JOB.CREATE_JOB } });
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
    route: QH_ROUTES.COMPANY.JOBS,
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
    route: QH_ROUTES.COMPANY.JOBS,
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
</script>

<style scoped></style>
