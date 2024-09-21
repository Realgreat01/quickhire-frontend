<template>
  <div class="flex flex-col gap-4 p-4">
    <EasyDataTable
      v-if="jobApplicants"
      :headers="headers"
      :items="jobApplicants.map((job: any) => job.user)"
      buttons-pagination
      no-hover
      hide-rows-per-page
      theme-color="#023696"
      class="text-dark-400"
    >
      <template #header="header">
        <p
          :class="header.class"
          class="qh-flex-center qh-text-4 my-2 hidden h-10 w-full text-center font-semibold text-brand"
        >
          {{ header.text }}
        </p>
      </template>

      <template #item-profile_picture="applicant">
        <div class="w-12">
          <img
            :src="applicant.profile_picture"
            alt=""
            class="h-10 w-10 rounded-full"
          />
        </div>
      </template>

      <template #item-username="applicant">
        <div class="min-w-60">
          <h1 class="qh-text-4 font-medium capitalize">
            {{ applicant?.firstname + ' ' + applicant?.lastname }}
          </h1>
          <h2 class="qh-text-5 text-brand">
            {{ applicant?.address?.country }}
          </h2>
          <h2 class="qh-text-5 capitalize">
            {{ applicant?.skills?.stack ?? 'Software Developer' }} /
            {{ applicant?.experience_level }} Level
          </h2>
        </div>
      </template>

      <template #item-rate="applicant">
        <div class="flex w-fit min-w-64 flex-wrap gap-1 capitalize">
          <qh-button
            class="qh-text-5 qh-flex-center h-4 gap-x-2 rounded-full !bg-dark-50 text-xs !font-normal capitalize !text-dark"
          >
            <RiBriefcaseLine class="h-4 w-4" />
            {{ applicant?.years_of_experience ?? 8 }} Years
          </qh-button>
          <qh-button
            class="qh-text-5 qh-flex-center h-4 gap-x-2 rounded-full !bg-dark-50 text-xs !font-normal capitalize !text-dark"
          >
            <RiCashLine class="h-4 w-4" />
            {{ qhNumbers.formatCurrency(applicant?.rate) }} / hour
          </qh-button>
          <qh-button
            class="qh-text-5 qh-flex-center h-4 gap-x-2 rounded-full !bg-dark-50 text-xs !font-normal capitalize !text-dark"
          >
            <RiHomeOfficeLine class="h-4 w-4" />
            {{ applicant?.job_interest }}
          </qh-button>
          <qh-button
            class="qh-text-5 qh-flex-center h-4 gap-x-2 rounded-full !bg-dark-50 text-xs !font-normal capitalize !text-dark"
          >
            <RiAlarmLine class="h-4 w-4" />
            {{ applicant?.availability }}
          </qh-button>
        </div>
      </template>

      <template #item-skills="applicant">
        <div class="qh-flex-center flex-col gap-4 p-4">
          <qh-resume-button
            :username="applicant?.username ?? ''"
            class="!h-6 w-full rounded-full !bg-brand-100 !text-brand"
            >Download&nbsp;Resume</qh-resume-button
          >
          <div class="flex flex-wrap gap-x-4">
            <qh-button
              variant="inverse"
              v-for="(skill, index) in applicant?.skills?.top_skills"
              :key="index"
              :icon="skill"
              class="!w-fit text-sm !font-medium !text-black"
            >
              {{ skill }}
            </qh-button>
          </div>
        </div>
      </template>

      <template #item-action="applicant">
        <div class="flex w-fit min-w-40 flex-col gap-3">
          <qh-button
            label="Update Status"
            @click="getCurrentJobApplicant(applicant._id)"
            class="h-8 w-full rounded-full"
          />

          <qh-button
            label="View Portfolio"
            @click="
              router.push({
                name: QH_ROUTES.USER.PREVIEW,
                params: { username: applicant?.username },
              })
            "
            class="h-8 w-full rounded-full !bg-dark-100 !text-brand"
          />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
import {
  RiCashLine,
  RiHomeOfficeLine,
  RiAlarmLine,
  RiBriefcaseLine,
} from 'vue-remix-icons';
import EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const router = useRouter();
const route = useRoute();
const { jobApplicants } = storeToRefs(useJobStore());
const { getJobApplicants, getJobApplicant } = useJobStore();

// const applicants = computed(()=> jobApplicants.map => )
definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.APPLICANTS,
});

useHead({
  title: 'QuickHire - Company Profile',
});

const searchField = ref('');
const searchValue = ref('');
const sortBy = ref('');
const sortType = ref('');

const getCurrentJobApplicant = async (applicantId: string) => {
  await getJobApplicant(route.params.id as string, applicantId);
  router.push({
    name: QH_ROUTES.COMPANY.APPLICANT,
    params: { job: route.params.id, applicant: applicantId },
  });
};
onMounted(async () => {
  await getJobApplicants(route.params.id as string);
});
const headers = [
  { text: '', value: 'profile_picture' },
  { text: '', value: 'username' },
  { text: '', value: 'rate' },
  { text: '', value: 'skills' },
  { text: '', value: 'action' },
];
</script>

<style scoped></style>
