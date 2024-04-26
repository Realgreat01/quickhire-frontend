<template>
  <div class="mt-20">
    <h1 class="qh-text-1">Latest Jobs</h1>
    <qh-table :items="jobs" :headers="headers"> </qh-table>
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
// import type { Header, Item, SortType } from 'vue3-easy-data-table';
const { formatCurrency, formatNumber } = useCurrency();
const { formatDate, getReadableDate } = useDate();

defineProps({ Class: String });

const headers: any[] = [
  {
    text: 'Company',
    value: 'posted_by',
    class: 'ml-4 justify-start text-left',
  },
  { text: 'Job Type', value: 'job_type' },
  { text: 'Status', value: 'isActive', sortable: true },
  { text: 'Application Opens', value: 'posted_on' },
  { text: 'Required Skills', value: 'required_skills' },
  { text: '', value: 'action' },
];

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

const jobs = latestJobs.value.map((item) => {
  item['details'] = Object.values(item?.posted_by).join();
  return item;
});
</script>

<style scoped></style>
