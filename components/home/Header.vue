<template>
  <div
    class="sticky top-0 z-[99] flex w-full items-center justify-between bg-white py-2"
  >
    <icons-logo class="text-brand" />
    <div
      class="hidden h-10 flex-1 items-center justify-between overflow-hidden rounded-full border pl-4 md:mx-10 md:flex"
    >
      <input
        name="job"
        v-model="searchQuery.title"
        class="w-fit !rounded-full border-none focus:!outline-none"
        placeholder="Search for jobs"
      />
      <span class="qh-flex-center h-full w-12 bg-brand" @click="searchJob"
        ><MagnifyingGlassIcon class="h-5 w-5 text-dark-50"
      /></span>
    </div>

    <div class="qh-flex-center ml-auto mr-4 hidden gap-4 md:flex">
      <NuxtLink
        :external="nav.external"
        :to="nav.link"
        class="qh-text-4 flex items-center rounded-full !bg-transparent px-4 py-1 !font-medium !text-brand duration-200 hover:!bg-brand-500 hover:!fill-brand-50 hover:!text-white"
        v-for="(nav, index) in headerNavigations"
        :key="index"
      >
        <span class=""> {{ nav.title }}</span>
      </NuxtLink>
    </div>

    <div class="flex items-center justify-end gap-x-0">
      <qh-theme-changer class="left-0 hidden" />
      <div class="hidden gap-x-4 md:flex" v-if="isLoggedIn">
        <RouterLink :to="{ name: QH_ROUTES.USER.PROFILE }">
          <qh-button class="!h-10 !w-60 font-medium" label="Dashboard" />
        </RouterLink>
      </div>
      <div class="hidden gap-x-4 md:flex" v-else>
        <RouterLink :to="{ name: QH_ROUTES.USER.LOGIN }">
          <qh-button class="!h-10 !w-40 !font-medium" label="Login" />
        </RouterLink>
        <RouterLink :to="{ name: QH_ROUTES.USER.REGISTER }">
          <qh-button
            label="Sign Up"
            variant="outlined"
            class="!h-10 !w-40 !border-2 !font-medium"
          />
        </RouterLink>
      </div>

      <qh-dropdown class="block md:hidden" v-slot="{ closeDropdown }">
        <qh-card class="w-[80vw] pt-4">
          <div class="mb-8 flex flex-col gap-y-4">
            <NuxtLink
              :external="nav.external"
              :to="nav.link"
              @click="closeDropdown"
              class="border-b-2 font-medium text-brand"
              v-for="(nav, index) in headerNavigations"
              :key="index"
            >
              <span class=""> {{ nav.title }}</span>
            </NuxtLink>
          </div>

          <div class="gap-x-4" v-if="isLoggedIn">
            <RouterLink :to="{ name: QH_ROUTES.USER.PROFILE }">
              <qh-button
                class="-full !h-10 !w-full !font-medium"
                label="Dashboard"
              />
            </RouterLink>
          </div>
          <div class="grid w-full gap-4" v-else>
            <RouterLink :to="{ name: QH_ROUTES.USER.LOGIN }">
              <qh-button class="!h-10 !w-full !font-medium" label="Login" />
            </RouterLink>
            <RouterLink :to="{ name: QH_ROUTES.USER.REGISTER }">
              <qh-button
                variant="outlined"
                label="Sign Up"
                class="!h-10 !w-full !font-medium"
              />
            </RouterLink>
          </div>
        </qh-card>
      </qh-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';

import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import QH_CONSTANTS from '~/constants';
import { useJobStore } from '~/store/job-store';
import { jobQuery } from '~/components/layouts/job/job-types';

defineProps({ Class: String });
const { searchQuery } = storeToRefs(useJobStore());
const { getAllJobs, getMatchedJobs } = useJobStore();
const router = useRouter();

const headerNavigations = ref([
  { link: '/jobs', title: 'Latest Jobs', external: false },
  {
    link: '/auth/company/login',
    title: 'For Employers',
    external: false,
  },
  { link: '#features', title: 'Features', external: true },
]);
const isLoggedIn = ref(false);
const checkLoggedInStatus = () => {
  if (qhSecuredLS.get(QH_CONSTANTS.AUTH_TOKEN)) isLoggedIn.value = true;
  else isLoggedIn.value = false;
};

const searchJob = () => {
  router.replace({ name: QH_ROUTES.JOB.ALL, query: searchQuery.value });
  if (
    searchQuery.value.title === '' &&
    searchQuery.value.location === '' &&
    searchQuery.value.type === '' &&
    searchQuery.value.level === ''
  ) {
    getAllJobs();
  } else getMatchedJobs();
};

onMounted(async () => setTimeout(() => checkLoggedInStatus(), 500));
</script>

<style scoped></style>
