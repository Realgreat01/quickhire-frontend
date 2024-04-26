<template>
  <div class="bg-white">
    <div class="grid grid-cols-[4fr,1fr]">
      <div class="h-fit border p-8 shadow">
        <div class="">
          <h1 class="qh-text-2 font-bold">About</h1>
          <hr class="border border-dark-400" />
          <p class="">{{ currentCompany?.company_description }}</p>
        </div>

        <div class="qh-company-info" v-for="info in companyInfo">
          <h2 class="qh-company-header">{{ info.title }}</h2>
          <h2 class="qh-company-content" v-html="info.value"></h2>
        </div>
      </div>

      <div class="h-full border shadow">
        <h2 class="qh-text-3 mt-8 text-center font-semibold">
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
import { useCompanyStore } from '~/store/company-store';
import { storeToRefs } from 'pinia';
import { RiUserAddLine } from 'vue-remix-icons';

const { currentCompany } = storeToRefs(useCompanyStore());

const companyInfo = computed(() => {
  return [
    {
      title: 'Category',
      value: currentCompany.value?.company_category,
    },
    {
      title: 'Employees Count',
      value: companyHelpers.getEmployeesCount(
        currentCompany.value?.company_employee_count,
      ),
    },
    {
      title: 'Website',
      value: `<a href="${currentCompany.value?.company_website}">${currentCompany.value?.company_website ?? ''}</a>`,
    },
    {
      title: 'Email',
      value: `<a href="mailto:${currentCompany.value?.company_email}">${currentCompany.value?.company_email ?? ''}</a>`,
    },
    {
      title: 'Started',
      value: qhDates.formatDate(new Date()),
    },
  ];
});
</script>

<style scoped></style>
