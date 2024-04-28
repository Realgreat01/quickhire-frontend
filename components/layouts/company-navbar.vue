<template>
  <div class="relative">
    <div
      class="h-28 w-full bg-[url('~/assets/images/office-image.jpg')] bg-cover bg-right"
    ></div>
    <div class="relative flex h-24 bg-brand-50">
      <img
        src="~/assets/images/company-logo.jpg"
        alt=""
        class="relative bottom-20 z-50 ml-4 h-40 w-40 rounded border border-dark-200 bg-white"
      />
      <div class="my-4 flex h-fit w-full items-center justify-between px-8">
        <div class="">
          <h1 class="qh-text-2 font-bold text-brand">
            {{ currentCompany?.company_name }}
          </h1>
          <h1 class="qh-text-4 font-medium text-dark">
            {{ currentCompany?.company_location }}
          </h1>
        </div>
        <qh-button class="rounded-full !px-16" @click="createJob"
          >Post New Job</qh-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompanyStore } from '~/store/company-store';
import { storeToRefs } from 'pinia';
import { QH_ROUTES } from '~/constants/routes';
const { currentCompany } = storeToRefs(useCompanyStore());

const router = useRouter();
const createJob = () =>
  router.replace({ query: { action: QH_ROUTES.COMPANY.CREATE_JOB } });
</script>

<style scoped></style>
