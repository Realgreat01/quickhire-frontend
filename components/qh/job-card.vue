<template>
  <qh-card
    class="flex w-full min-w-[45vw] flex-col bg-white md:min-w-[35vw] md:max-w-[45vw]"
    :class="Class"
  >
    <qh-button
      v-if="job?.is_new"
      class="mb-4 mt-2 !h-6 w-fit gap-1 self-end justify-self-end rounded-full bg-error-100 !py-2 px-4 text-xs capitalize"
    >
      <h2 class="text-red-500">NEW</h2>
      <FireIcon class="h-4 w-4 text-orange-500" />
    </qh-button>

    <div class="flex justify-between gap-x-2">
      <div class="flex">
        <img
          :src="job.posted_by?.logo"
          alt=""
          class="block h-12 w-12 object-contain p-1"
        />

        <!-- logo {{ job?.posted_by }} -->
        <div class="ml-5 flex flex-col">
          <h1 class="qh-text-4 flex items-center font-bold text-brand">
            <span class=""> {{ job.posted_by?.company_name }}</span>
            <RiVerifiedBadgeFill
              class="ml-1 h-[14px] w-[14px] fill-secondary-500"
            />
          </h1>
          <h1 class="qh-text-5 ml-0 text-dark-300">
            <span class="" v-if="job.posted_by?.address.state">
              {{ job.posted_by?.address.state }},
            </span>
            {{ job.posted_by?.address.country }}
          </h1>
          <h1 class="qh-text-2 my-1 font-semibold">
            {{ qhHelpers.sliceWords(job.job_title, 30) }}
          </h1>

          <h1 class="qh-text-5 capitalize">
            {{ job.experience_level }} Level {{ job.job_type }}
          </h1>
        </div>
      </div>

      <div class="flex flex-col items-end gap-2">
        <div class="flex items-center gap-x-1 capitalize">
          <RiBuildingLine
            class="h-4 w-4 fill-brand"
            v-if="job.job_location_type === 'onsite'"
          />
          <RiHomeOfficeLine
            class="h-4 w-4 fill-brand"
            v-if="job.job_location_type === 'hybrid'"
          />
          <RiHomeWifiLine
            class="h-4 w-4 fill-brand"
            v-if="job.job_location_type === 'remote'"
          />
          <span class="text-sm text-dark-400">{{ job.job_location_type }}</span>
        </div>
        <h1 class="qh-text-4 font-bold text-secondary">
          {{
            qhNumbers.formatCurrency(
              qhNumbers.convertCurrencyToNumber(
                job.salary.value as number,
              ) as number,
            )
          }}
        </h1>
        <router-link
          :to="{ name: QH_ROUTES.JOB.SINGLE, params: { id: job._id } }"
        >
          <qh-button
            @click="getSingleJob(job?._id)"
            class="apply-button qh-text-4 h-6 w-28 gap-x-4 self-end rounded-full border border-brand bg-transparent font-medium !text-brand"
          >
            <span class="">{{ job?.is_applicant ? 'View' : 'Apply' }}</span>
            <ArrowRightCircleIcon
              class="apply-icon h-5 w-5 text-brand duration-500"
            />
          </qh-button>
        </router-link>
      </div>
    </div>

    <div class="flex w-full items-end justify-between">
      <h1 class="qh-text-4 flex items-center gap-x-2 text-dark-400">
        <ClockIcon class="apply-icon h-4 w-4 duration-500" />
        <span class="">{{ qhDates.formatDate(job.posted_on) }}</span>
      </h1>
      <div class="flex flex-col">
        <h2 class="qh-text-4 mt-4 flex h-6 items-center gap-x-1 text-dark-400">
          <RiUserFill class="h-4 w-4" />

          <h2 class="ml-1 font-bold">
            {{ qhNumbers.formatNumber(job.applicants.length) }}
          </h2>
          <h2 class="block">Applicants</h2>
        </h2>
      </div>
    </div>
  </qh-card>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon, ClockIcon } from '@heroicons/vue/24/outline';
import { FireIcon } from '@heroicons/vue/24/solid';
import {
  RiVerifiedBadgeFill,
  RiUserFill,
  RiBuildingLine,
  RiHomeWifiLine,
  RiHomeOfficeLine,
} from 'vue-remix-icons';
import { QH_ROUTES } from '~/constants/routes';
import { useJobStore } from '~/store/job-store';
import type { Job } from '~/types/job';
defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true,
  },
  Class: String,
});
const route = useRoute();
const { allJobs } = storeToRefs(useJobStore());
const { getSingleJob } = useJobStore();
</script>

<style scoped lang="scss">
.apply-button:hover {
  @apply scale-[1.05] bg-brand text-white;
  .apply-icon,
  span {
    color: white !important;
  }
  svg {
    @apply translate-x-2 transform text-white;
  }
}
</style>
