<template>
  <div>
    <h1 class="qh-text-2 mb-5 mt-20 font-bold">Job Openings</h1>

    <div class="relative grid gap-2 md:grid-cols-[2fr,1fr]">
      <!-- Jobs -->
      <div class="flex flex-col gap-4" v-if="allJobs">
        <div
          class="flex flex-col gap-y-4 rounded-lg border border-brand-50 bg-white p-4"
          v-for="job in allJobs"
        >
          <!-- 1 -->
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-y-2">
              <div class="flex gap-x-8">
                <h1 class="qh-text-3 font-bold text-brand">
                  {{ job.job_title }}
                </h1>
                <qh-button
                  v-if="job.isActive"
                  label="Active"
                  class="qh-text-4 hidden h-4 rounded-full bg-green-500 px-4 font-medium md:block"
                />

                <qh-button
                  v-else
                  label="Closed"
                  class="qh-text-4 hidden h-4 rounded-full bg-error-600 px-4 font-medium !text-dark-100 md:block"
                />
              </div>

              <div class="md:hidden">
                <qh-button
                  v-if="job.isActive"
                  label="Active"
                  class="qh-text-4 h-4 rounded-full bg-green-500 px-4 font-medium"
                />

                <qh-button
                  v-else
                  label="Closed"
                  class="qh-text-4 h-4 rounded-full bg-error-600 px-4 font-medium !text-dark-100"
                />
              </div>
              <div class="flex gap-x-8">
                <qh-button
                  :label="job.job_type"
                  class="qh-text-4 h-4 rounded-full bg-brand-100 px-4 !text-brand-700"
                />
                <qh-button
                  label="Remote"
                  class="qh-text-4 h-4 rounded-full bg-brand-100 px-4 !text-brand-700"
                />
                <h1
                  class="qh-text-3 hidden font-bold text-success-800 md:block"
                >
                  {{ qhNumbers.formatCurrency(job.salary) }}
                </h1>
              </div>
              <h1 class="qh-text-3 font-bold text-success-800">
                {{ qhNumbers.formatCurrency(job.salary) }}
              </h1>
            </div>

            <!-- second side  -->

            <div class="flex flex-col items-end">
              <h2 class="qh-text-4">
                {{
                  qhNumbers.formatNumber(
                    qhNumbers.convertCurrencyToNumber(job.salary) * 0.0029,
                  )
                }}
                Applicants
              </h2>
              <qh-button
                class="qh-text-4 h-6 w-fit rounded-full bg-secondary px-3 md:px-5"
                label="See&nbsp;Applicants"
              />
            </div>
          </div>
          <hr class="border border-dashed border-brand" />
          <div class="">
            <h1 class="qh-text-3 font-bold">Job Description</h1>
            <p class="" v-html="job.job_description"></p>
          </div>

          <hr class="my-4 border border-dashed border-brand" />

          <div class="flex justify-between">
            <div class="">
              <h1 class="qh-text-4 font-bold">Posted By</h1>
              <p class="">{{ qhDates.formatDate(job.posted_on) }}</p>
            </div>
            <div class="">
              <h1 class="qh-text-4 font-bold">Application End</h1>
              <!-- <p class="">{{ qhDates.formatDate(job.application_ends) }}</p> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Resources -->
      <div class="sticky top-0 h-fit bg-white p-4">
        <h1 class="qh-text-2 text-center font-bold">Resources</h1>

        <h2
          class="mx-2 mt-2 rounded-lg py-2 font-semibold text-brand-800"
          v-for="(tips, index) in hrResources"
          :key="index"
        >
          <span class="mr-2 text-dark"> {{ index + 1 }}.</span>
          <a :href="tips.url" class="font-medium">{{ tips.title }}</a>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '~/types/company';
import { useJobStore } from '~/store/job-store';

const { allJobs } = storeToRefs(useJobStore());

const { getAllJobs } = useJobStore();

const hrResources = ref([
  {
    title: 'Hiring Tips for Managers',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/6-tips-for-hiring-managers.aspx',
  },
  {
    title: 'Basics of Applicant Tracking System',
    url: 'https://www.naceweb.org/talent-acquisition/technology/basics-of-applicant-tracking-systems/',
  },
  {
    title: 'Effective Onboarding Strategies',
    url: 'https://hbr.org/2020/07/what-good-onboarding-looks-like',
  },
  {
    title: 'Diversity in Hiring: Best Practices',
    url: 'https://www.ncsl.org/research/labor-and-employment/diversity-in-the-workplace-overview.aspx',
  },
  {
    title: 'Legal Considerations in Recruitment',
    url: 'https://www.eeoc.gov/laws/guidance/section-12-religious-discrimination',
  },
  {
    title: 'How to Conduct Remote Interviews',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/conduct-remote-job-interviews.aspx',
  },
  {
    title: 'Building a Strong Employer Brand',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/6-tips-for-hiring-managers.aspx',
  },
  {
    title: 'Leveraging Social Media for Recruitment',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/7-tips-social-media-recruiting-strategies.aspx',
  },
  {
    title: 'Mastering Interview Techniques',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/how-to-conduct-job-interviews.aspx',
  },
  {
    title: 'Implementing Skills-based Hiring',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/talent-acquisition/pages/how-adopt-skills-based-hiring-practices.aspx',
  },
  {
    title: 'Optimizing Employee Retention Strategies',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/employee-relations/pages/strategies-to-help-retain-employees.aspx',
  },
  {
    title: 'Understanding HR Compliance',
    url: 'https://www.shrm.org/resourcesandtools/legal-and-compliance/employment-law/pages/default.aspx',
  },
  {
    title: 'Advancing Women Leadership in the Workplace',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/behavioral-competencies/leadership-and-navigation/pages/viewpoint-women-leaders-needed-to-help-solve-the-labor-shortage.aspx',
  },
  {
    title: 'Promoting Workplace Mental Health',
    url: 'https://www.shrm.org/resourcesandtools/hr-topics/employee-relations/pages/promoting-workplace-mental-health-in-the-covid-era.aspx',
  },
]);

onMounted(() => {
  if (process.client) {
    getAllJobs();
  }
});
</script>

<style scoped></style>
