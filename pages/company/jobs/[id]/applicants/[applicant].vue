<template>
  <div class="relative grid grid-cols-[4fr,4fr] gap-6 p-4">
    <qh-card class="flex w-full flex-col gap-6">
      <img
        :src="applicant?.profile_picture"
        alt=""
        class="mx-auto h-20 w-20 items-center rounded-full"
      />
      <div class="mx-auto">
        <h1 class="qh-text-2 font-semibold capitalize">
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
      <div class="mx-auto flex w-fit gap-4 capitalize">
        <qh-button
          class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-success-100 px-4 text-xs font-semibold !text-success-500"
        >
          <RiCashLine class="h-4 w-4" />
          {{ qhNumbers.formatCurrency(10) }} /
          <span class="">hour</span>
        </qh-button>
        <qh-button
          class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-brand-100 px-4 text-xs font-semibold capitalize !text-brand-500"
        >
          <RiHomeOfficeLine class="h-4 w-4" />
          {{ applicant?.job_interest }}
        </qh-button>
      </div>
      <div class="mx-auto">
        <h2 class="qh-text-3 font-semibold">Top Skills</h2>
        <div class="flex">
          <qh-devicon
            v-for="icon in applicant?.skills?.top_skills"
            :icon="icon"
          />
        </div>
      </div>

      <div class="flex gap-4">
        <qh-resume-button
          :username="applicant?.username ?? ''"
          class="qh-text-4 !h-10 w-full !rounded-full !bg-brand-100 !px-2 !py-2 !text-brand"
        />
        <qh-button
          label="View Portfolio"
          @click="
            router.push({
              name: QH_ROUTES.USER.PREVIEW,
              params: { username: applicant?.username },
            })
          "
          class="qh-text-4 !h-10 w-full !rounded-full !bg-brand-100 !px-2 !py-2 !text-brand"
        />
      </div>
    </qh-card>

    <qh-card class="relative flex w-full flex-col gap-4">
      <div class="grid w-full grid-cols-2 items-center">
        <h2 class="qh-text-3 font-semibold">Status</h2>
        <qh-input
          name="status"
          type="select"
          v-model="applicantStatus.status"
          class="capitalize"
          :options="['received', 'processing', 'accepted', 'rejected']"
        />
      </div>

      <div class="grid w-full grid-cols-2 items-center">
        <div class="flex flex-col">
          <h2 class="qh-text-3 font-semibold">Interview Dates</h2>

          <div class="flex flex-col">
            <button
              class="qh-text-5 mt-1 block w-fit border-b border-l border-brand px-8 py-1 text-brand"
              v-for="date in applicantStatus?.interview_dates"
            >
              {{ qhDates.formatDate(date) }}
            </button>
          </div>
        </div>
        <qh-input
          name="interview_dates"
          type="date"
          :multi-dates="{ limit: 3 }"
          :autoApply="false"
          hint="select upto 3 interview dates"
          v-model="applicantStatus.interview_dates"
          class="capitalize"
        />
      </div>

      <div class="grid w-full grid-cols-2 items-center">
        <h2 class="qh-text-3 font-semibold">Interview Feedback</h2>
        <qh-button
          disabled
          class="qh-text-4 flex h-4 items-center gap-x-2 rounded-full !bg-success-500 px-4 text-xs font-semibold capitalize"
        >
          <PencilSquareIcon class="h-6 w-6" />
        </qh-button>
      </div>

      <div class="grid w-full grid-cols-2 items-center">
        <h2 class="qh-text-3 font-semibold">Evaluation Score</h2>
        <qh-input name="score" type="number" />
      </div>
      <div class="grid w-full">
        <h2 class="qh-text-3 font-semibold">Notes</h2>
        <qh-input name="notes" as="textarea" />
      </div>

      <qh-button
        @click="updateApplicantStatus"
        class="qh-text-4 cols-span-2 my-4 flex h-12 !w-full rounded-full !py-3 md:w-60"
        label="Save Changes"
      />
    </qh-card>
  </div>
</template>

<script setup lang="ts">
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
import { RiCashLine, RiHomeOfficeLine } from 'vue-remix-icons';
import { PencilSquareIcon } from '@heroicons/vue/24/solid';

definePageMeta({
  layout: 'company',
  middleware: ['auth', 'company'],
  name: QH_ROUTES.COMPANY.APPLICANT,
});

useHead({
  title: 'QuickHire - Applicant',
});

const route = useRoute();
const router = useRouter();
const { jobApplicant } = storeToRefs(useJobStore());
const { getJobApplicant, updateJobApplicant } = useJobStore();

const applicant = computed(() => jobApplicant.value?.user);

const applicantStatus = ref({
  status: jobApplicant.value?.status ?? 'Received',
  notes: jobApplicant.value?.notes,
  evaluation_score: jobApplicant.value?.evaluation_score,
  interview_dates: jobApplicant.value?.interview_dates,
  // interview_feedback: '',
});

const updateApplicantStatus = async () => {
  await updateJobApplicant(
    applicantStatus.value,
    route.params.id as string,
    route.params.applicant as string,
  );
};

onBeforeMount(async () => {
  await getJobApplicant(
    route.params.id as string,
    route.params.applicant as string,
  );
});
</script>

<style scoped></style>
