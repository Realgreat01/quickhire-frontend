<template>
  <div class="flex flex-col gap-4 p-4">
    <div
      class="grid grid-cols-[0.5fr,3fr,2fr,2fr,1.5fr] gap-4 rounded bg-dark-100 p-4"
      v-for="{ user: applicant, ...status } in jobApplicants"
      :key="applicant._id"
    >
      <div class="">
        <img
          :src="applicant.profile_picture"
          alt=""
          class="h-10 w-10 rounded-full"
        />
      </div>
      <div class="">
        <h1 class="qh-text-3 capitalize">
          {{ applicant?.firstname + ' ' + applicant?.lastname }}
        </h1>
        <h2 class="qh-text-4 font-semibold capitalize">
          {{ applicant?.skills?.stack ?? 'developer' }} /
          {{ applicant?.experience_level }} Level
        </h2>
        <h2 class="qh-text-4">
          {{ applicant?.address?.country }}
        </h2>
      </div>
      <div class="flex w-fit flex-col gap-4 capitalize">
        <qh-button
          class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-success-100 px-4 text-xs font-semibold !text-success-500"
        >
          <RiCashLine class="h-4 w-4" />
          {{ qhNumbers.formatCurrency(applicant?.rate) }} /
          <span class="">hour</span>
        </qh-button>
        <qh-button
          class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-brand-100 px-4 text-xs font-semibold capitalize !text-brand-500"
        >
          <RiHomeOfficeLine class="h-4 w-4" />
          {{ applicant?.job_interest }}
        </qh-button>
      </div>

      <div class="flex w-fit flex-col gap-4">
        <qh-resume-button
          :user="applicant"
          class="qh-text-4 !h-10 w-full !rounded-full !bg-cyan-100 !px-6 !py-2 !text-sm !font-medium !text-cyan-500"
        />
        <div class="flex">
          <qh-devicon
            v-for="icon in applicant?.skills?.top_skills"
            :icon="icon"
          />
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <qh-button
          label="View Portfolio"
          @click="
            router.push({
              name: QH_ROUTES.USER.PREVIEW,
              params: { username: applicant?.username },
            })
          "
          class="h-8 w-full rounded-full !bg-brand-100 !text-brand"
        />
        <qh-button
          label="Update Status"
          @click="getCurrentJobApplicant(applicant._id)"
          class="h-8 w-full rounded-full"
        />
      </div>
    </div>

    <!-- {{ jobApplicants }} -->
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
import { RiCashLine, RiHomeOfficeLine } from 'vue-remix-icons';
import EasyTable from 'vue3-easy-data-table';

const router = useRouter();
const route = useRoute();
const { jobApplicants } = storeToRefs(useJobStore());
const { getJobApplicants, getJobApplicant } = useJobStore();

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.APPLICANTS,
});

useHead({
  title: 'QuickHire - Company Profile',
});

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
</script>

<style scoped></style>
