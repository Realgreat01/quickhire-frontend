<template>
  <div
    class="bg-brand-950 py-20 text-dark-100 dark:bg-brand-50 dark:text-dark-800"
  >
    <h1 class="qh-text-1 mb-4 text-dark-200 md:mb-5 dark:text-dark-800">
      Features
    </h1>

    <div class="grid w-full md:grid-cols-3 gap-4">
      <qh-card
        class="flex flex-col-reverse gap-2 !border-dark-600 bg-brand-900 p-1 py-10 !shadow-none md:flex-row md:gap-40 md:p-6 dark:border-none dark:bg-brand-100"
        v-for="(feature, index) in features.filter((x) => x.show === true)"
      >
        <div class="w-full md:w-[100%]">
          <div class="flex items-center gap-x-4" :classs="feature?.class">
            <component
              :is="feature.icon"
              class="h-8 w-8 fill-brand-300 dark:fill-brand-700"
              :classs="feature.class"
            />

            <h4
              class="qh-text-3 font-semibold text-brand-100 dark:text-brand-900"
            >
              {{ feature.title }}
            </h4>
          </div>

          <h4
            class="qh-text-4 w-full font-normal text-dark-300 dark:text-dark-800"
          >
            {{ feature.description }}
          </h4>
        </div>
        <div
          class="hidden w-full border border-dashed border-dark-300 md:w-[55%]"
        >
          <img
            :src="feature?.image"
            alt=""
            class="h-40 w-full transform object-cover object-top p-4 md:h-80 md:object-cover"
          />
        </div>
      </qh-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RiAccountBoxFill,
  RiFileEditLine,
  RiSendPlane2Line,
  RiAwardLine,
  RiSendPlaneFill,
  RiListCheck3,
  RiSearchLine,
  RiMegaphoneFill,
} from 'vue-remix-icons';

defineProps({ Class: String });

const features = shallowRef([
  // Developer-Centered Features
  {
    title: 'Resumé Generator',
    icon: RiFileEditLine,
    class: ' fill-red-500',
    show: true,
    image: '/features/resume.png',
    description:
      'Allows developers to quickly generate polished resumes from their profile data. Offers customization options with various templates, enabling personalization for different job applications.',
  },
  {
    title: 'Public Portfolio Page',
    icon: RiSendPlaneFill,
    show: true,
    image: '/features/public-portfolio.png',
    description:
      'Helps developers quickly create stunning portfolios using their profile data. Choose from a variety of templates and customize them to showcase your skills and projects. Easily personalize layouts, themes, and highlights to make your portfolio stand out for any job application.',
  },
  {
    title: 'One-Click Applications',
    icon: RiSendPlaneFill,
    show: true,
    image: '/features/apply.png',
    description:
      'Developers can apply to multiple job listings with a single click using their saved profiles and resumes. This streamlines the application process, making job hunting more efficient and less time-consuming.',
  },
  {
    title: 'Skill Validation Tests',
    icon: RiAwardLine,
    class: '',
    show: false,
    image: '/features/resume.png',
    description:
      'Provides developers with the opportunity to validate their skills through certification tests, which can be showcased on their profiles to enhance credibility and attract more job opportunities.',
  },
  // Hiring Manager-Centered Features
  {
    title: 'Applicant Tracking System',
    icon: RiListCheck3,
    class: '',
    show: true,
    image: '/features/applicant-tracking.png',
    description:
      'A comprehensive system that allows hiring managers to track and manage applications throughout the recruitment process. Features include status updates, automated filtering, and candidate ranking.',
  },
  {
    title: 'Quick Job Postings',
    class: '',
    show: true,
    image: '/features/post-job.png',
    icon: RiMegaphoneFill, // Represents quick actions
    description:
      'Enables hiring managers to create and manage job postings with ease. The feature includes a streamlined interface for entering job details and requirements, allowing for rapid posting without the need for complex setup or configuration.',
  },

  {
    title: 'Advanced Search & Filtering',
    class: '',
    show: true,
    image: '/features/find-talents.png',
    icon: RiSearchLine, // Symbolizes search functionality
    description:
      'Allows hiring managers to perform detailed searches and apply complex filters to identify the best candidates based on specific criteria such as skills, experience, and educational background.',
  },
]);
</script>

<style scoped></style>
