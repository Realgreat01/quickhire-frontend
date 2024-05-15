<template>
  <div class="bg-white">
    <div class="grid gap-y-6 md:grid-cols-[4fr,1fr]">
      <div class="relative h-fit border p-8 shadow">
        <qh-edit-button class="!top-2" @click="editCompany" />
        <div class="relative">
          <h1 class="qh-text-2 font-bold">About</h1>
          <hr class="border border-dark-400" />
          <p class="" v-html="company?.description"></p>
        </div>

        <div class="qh-company-info" v-for="info in companyInfo">
          <h2 class="qh-company-header">{{ info.title }}</h2>
          <h2 class="qh-company-content" v-html="info.value"></h2>
        </div>
      </div>

      <div class="h-full border py-4 pb-8 shadow">
        <h2 class="qh-text-3 text-center font-semibold md:mt-8">
          Hiring Managers
        </h2>
        <h2
          class="qh-text-3 flex h-full w-full flex-col items-center justify-center"
        >
          <RiUserAddLine class="h-36 w-36 fill-brand-500" />
          <h2 class="qh-text-4 text-center">Onboard Hiring Manager</h2>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useCompanyStore } from '~/store/company-store';
import { storeToRefs } from 'pinia';
import { RiUserAddLine } from 'vue-remix-icons';

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.DASHBOARD,
});

useHead({
  title: 'QuickHire - Company Profile',
});

const { company } = storeToRefs(useCompanyStore());
const router = useRouter();

const editCompany = () => {
  router.replace({ query: { edit: QH_ROUTES.COMPANY.INFO } });
};

const companyInfo = computed(() => {
  return [
    {
      title: 'Category',
      value: company.value?.category,
    },
    {
      title: 'Employees Count',
      value: companyHelpers.getEmployeesCount(company.value?.employee_count),
    },
    {
      title: 'Website',
      value: `<a href="${company.value?.website}">${company.value?.website ?? ''}</a>`,
    },
    {
      title: 'Email',
      value: `<a href="mailto:${company.value?.email}">${company.value?.email ?? ''}</a>`,
    },
    {
      title: 'Started',
      value: company.value?.incorporation_date as Date,
    },
  ];
});
</script>

<style scoped></style>
