<template>
  <qh-container @close="$emit('close')" title="Basic Details">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, submitCompanyDetails)"
      >
        <div class="grid grid-cols-1 gap-4">
          <qh-input
            label="Category"
            name="category"
            placeholder="IT Company"
            required
            v-model="companyInfo.category"
            :rules="ValidationRules.company.category"
          />

          <qh-input
            type="number"
            label="Employee Count"
            name="employee-count"
            v-model.trim.number="companyInfo.employee_count"
          />

          <qh-input
            label="Parent Company"
            name="middlename"
            placeholder="Parent Company"
            v-model="companyInfo.parent_company"
          />

          <qh-input
            label="Website"
            type="text"
            name="firstname"
            required
            :server-errors="serverErrors"
            placeholder="Your firstname"
            v-model="companyInfo.website"
            :rules="ValidationRules.company.website"
          />

          <qh-input
            label="Incorporation Date"
            type="date"
            name="incorporation date"
            required
            :server-errors="serverErrors"
            v-model="companyInfo.incorporation_date"
          />

          <qh-input
            label="Contact Phone"
            name="phone_number"
            :server-errors="serverErrors"
            placeholder="+234 803 123 4567"
            v-model="companyInfo.contact_phone"
            :rules="ValidationRules.company.contact_phone"
          />

          <qh-input
            label="Description"
            type="editor"
            name="description"
            required
            :server-errors="serverErrors"
            v-model="companyInfo.description"
          />
        </div>
        <qh-button
          type="submit"
          class="mt-4 !h-12 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
  </qh-container>
</template>

<script setup lang="ts">
import { EDIT_USER_DETAILS } from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';

import type { Company } from '~/types/company';
import { useCompanyStore } from '~/store/company-store';
import { UPDATE_COMPANY_DETAILS } from '~/services/company.service';

const { getCurrentCompany } = useCompanyStore();
const { company } = storeToRefs(useCompanyStore());
const serverErrors = ref({});

const companyInfo = ref({
  website: company.value?.website,
  description: company.value?.description,
  category: company.value?.category,
  parent_company: company.value?.parent_company,
  incorporation_date: company.value?.incorporation_date,
  employee_count: company.value?.employee_count,
  contact_phone: company.value?.contact_phone,
  operational_status: company.value?.operational_status,
});

const submitCompanyDetails = async (field: any) => {
  const res = await UPDATE_COMPANY_DETAILS(
    qhHelpers.filterEmptyValues(companyInfo.value),
  );
  if (res.success) {
    qhToast.success('company updated successfully');
    getCurrentCompany();
    qhCloseModal();
  } else {
    qhToast.error('unable to update company details');
    if (res.errors) serverErrors.value = res.errors;
  }
};
</script>
