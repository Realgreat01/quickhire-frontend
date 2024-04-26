<template>
  <div class="mt-20">
    <div class="my-8 mb-5 flex w-full">
      <h1 class="qh-text-1">Latest Jobs</h1>
      <div class="">
        <qh-input
          label=""
          name=""
          placeholder="Search for jobs or talents"
          class="h-10 w-[500px] pl-8 placeholder:!font-light"
        />
      </div>
    </div>
    <div class="flex flex-col">
      <div
        class="grid w-full grid-cols-[0.5fr,2fr,0.75fr,0.75fr,1.75fr,2fr,2fr] border border-dashed border-b-brand py-3"
        v-for="(job, index) in latestJobs"
      >
        <img
          src="~~/assets/images/company-logo.jpg"
          alt=""
          class="block h-12"
        />
        <!-- 2 -->
        <div class="">
          <h1 class="qh-text-3 font-semibold">{{ job.job_title }}</h1>
          <h1 class="qh-text-3 text-brand">
            {{ job.posted_by?.company_name }}
          </h1>
          <h1 class="qh-text-4">
            {{ job.posted_by?.company_location }}
          </h1>
        </div>
        <!-- 3 -->
        <div class="">
          <h4 class="qh-text-4 font-semibold text-brand">
            {{ job.job_type }}
          </h4>
          <h4 class="qh-text-4 font-semibold">
            {{ formatCurrency(job.salary) }}
          </h4>
        </div>
        <!-- 3 -->
        <div class="">
          <qh-button
            class="flex h-8 w-28 gap-x-4 rounded-full bg-success-400"
            v-if="job.isActive"
          >
            <span class="">Active</span>
            <RiCheckboxCircleFill class="h-5 w-5 rounded-full" />
          </qh-button>

          <qh-button
            v-else
            class="flex h-8 w-28 gap-x-4 rounded-full bg-error-300"
            ><span class="">Closed</span>
            <RiCloseCircleFill class="h-5 w-5 rounded-full" />
          </qh-button>
        </div>

        <!-- 4 -->
        <div class="qh-text-4 text-center">
          <h2 class="font-bold">Application Opens</h2>
          <h4 class="font-medium">
            {{ getReadableDate(job.posted_on) }}
            -
            {{ getReadableDate(job.application_ends) }}
          </h4>
          <h4 class="">
            <span class="text-secondary-600">
              {{ formatNumber(2000 * (index + 0.678)) }}</span
            >
            Applicants
          </h4>
        </div>

        <!-- 5 -->
        <div
          class="flex h-full w-full flex-wrap items-center justify-center gap-2"
        >
          <i
            :class="skill.icon"
            v-for="skill in job.required_skills"
            class="colored h-10"
          ></i>
        </div>

        <!-- 6 -->
        <div class="flex items-center justify-center gap-x-6">
          <h4 class="rounded-full border border-brand p-2">
            <RiShareLine class="h-6 w-6 fill-brand !stroke-none" />
          </h4>
          <qh-button
            class="h-10 w-20 rounded-full border border-brand bg-transparent font-medium !text-brand hover:bg-brand-200"
            >Apply
          </qh-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RiShareFill,
  RiShareLine,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
} from 'vue-remix-icons';
import type { Job } from '~/types/company';

const { formatCurrency, formatNumber } = useCurrency();
const { formatDate, getReadableDate } = useDate();

const latestJobs = ref<Job[]>([
  {
    posted_by: {
      company_name: 'Amazon',
      company_location: 'Seattle, USA',
      company_logo: '',
      company_id: 'XCD',
    },
    job_title: 'Project Manager',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: false,
    job_type: 'Fulltime',
    salary: 3735,
    posted_on: '2024-06-29T10:02:24.369806',
    application_ends: '2024-08-01T23:21:00.369806',
    job_duration: '2025-02-22T03:20:48.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Netflix',
      company_location: 'Los Gatos, USA',
      company_logo: '',
      company_id: 'SEQ',
    },
    job_title: 'DevOps Engineer',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: true,
    job_type: 'Contract',
    salary: 7985,
    posted_on: '2024-05-28T18:50:46.369806',
    application_ends: '2024-08-28T07:00:49.369806',
    job_duration: '2025-03-31T15:48:24.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Apple',
      company_location: 'Cupertino, USA',
      company_logo: '',
      company_id: 'OXO',
    },
    job_title: 'Backend Developer',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: false,
    job_type: 'Fulltime',
    salary: 5429,
    posted_on: '2024-05-11T03:47:32.369806',
    application_ends: '2024-12-26T19:20:56.369806',
    job_duration: '2024-12-04T04:49:55.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Twitter',
      company_location: 'San Francisco, USA',
      company_logo: '',
      company_id: 'ROO',
    },
    job_title: 'Security Analyst',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: true,
    job_type: 'Contract',
    salary: 9620,
    posted_on: '2024-07-08T18:12:08.369806',
    application_ends: '2024-10-03T16:53:05.369806',
    job_duration: '2024-11-30T07:33:00.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Netflix',
      company_location: 'Los Gatos, USA',
      company_logo: '',
      company_id: 'WDM',
    },
    job_title: 'Project Manager',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: false,
    job_type: 'Fulltime',
    salary: 6681,
    posted_on: '2024-05-31T05:26:40.369806',
    application_ends: '2025-01-13T12:08:30.369806',
    job_duration: '2025-07-12T09:20:26.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Microsoft',
      company_location: 'Abuja, Nigeria',
      company_logo: '',
      company_id: 'TTO',
    },
    job_title: 'UX/UI Designer',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: true,
    job_type: 'Fulltime',
    salary: 3218,
    posted_on: '2024-06-16T12:03:21.369806',
    application_ends: '2024-07-29T22:58:25.369806',
    job_duration: '2025-04-18T14:48:28.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Facebook',
      company_location: 'Menlo Park, USA',
      company_logo: '',
      company_id: 'VBK',
    },
    job_title: 'UX/UI Designer',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: true,
    job_type: 'Internship',
    salary: 5379,
    posted_on: '2024-06-23T06:55:59.369806',
    application_ends: '2024-07-26T05:37:35.369806',
    job_duration: '2025-04-08T21:30:47.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Google',
      company_location: 'Mountain View, USA',
      company_logo: '',
      company_id: 'ZKE',
    },
    job_title: 'DevOps Engineer',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: false,
    job_type: 'Part-Time',
    salary: 5995,
    posted_on: '2024-05-22T01:31:44.369806',
    application_ends: '2024-11-30T11:47:04.369806',
    job_duration: '2024-11-22T10:48:17.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Airbnb',
      company_location: 'San Francisco, USA',
      company_logo: '',
      company_id: 'TWM',
    },
    job_title: 'DevOps Engineer',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: true,
    job_type: 'Internship',
    salary: 5424,
    posted_on: '2024-05-05T04:53:21.369806',
    application_ends: '2024-08-13T02:48:20.369806',
    job_duration: '2025-04-21T20:42:07.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
  {
    posted_by: {
      company_name: 'Microsoft',
      company_location: 'Abuja, Nigeria',
      company_logo: '',
      company_id: 'AHN',
    },
    job_title: 'UX/UI Designer',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isActive: true,
    job_type: 'Part-Time',
    salary: 2380,
    posted_on: '2024-06-22T13:30:09.369806',
    application_ends: '2024-10-06T07:15:33.369806',
    job_duration: '2025-06-14T22:38:49.369806',
    required_skills: [
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
    ],
    applicants: [],
  },
]);
</script>

<style scoped></style>
