<template>
  <div>
    <h1 class="qh-text-1">Features</h1>

    <div class="grid grid-cols-3 gap-4">
      <div
        class="rounded-2xl border bg-dark-50 p-6"
        v-for="(feature, index) in features"
      >
        <div class="flex h-10 items-start gap-x-4">
          <component :is="feature.icon" class="block h-6 w-6 fill-brand-500" />

          <h4 class="qh-text-3 mb-8 font-semibold text-brand-500">
            {{ feature.title }}
          </h4>
        </div>

        <h4 class="qh-text-4">{{ feature.description }}</h4>
      </div>
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

const features = ref([
  // Developer-Centered Features
  {
    title: 'Resume Generator',
    icon: RiFileEditLine,
    description:
      'Allows developers to quickly generate polished resumes from their profile data. Offers customization options with various templates, enabling personalization for different job applications.',
  },
  {
    title: 'One-Click Applications',
    icon: RiSendPlaneFill,
    description:
      'Developers can apply to multiple job listings with a single click using their saved profiles and resumes. This streamlines the application process, making job hunting more efficient and less time-consuming.',
  },
  {
    title: 'Skill Validation Tests',
    icon: RiAwardLine,
    description:
      'Provides developers with the opportunity to validate their skills through certification tests, which can be showcased on their profiles to enhance credibility and attract more job opportunities.',
  },
  // Hiring Manager-Centered Features
  {
    title: 'Applicant Tracking System',
    icon: RiListCheck3,
    description:
      'A comprehensive system that allows hiring managers to track and manage applications throughout the recruitment process. Features include status updates, automated filtering, and candidate ranking.',
  },
  {
    title: 'Quick Job Postings',
    icon: RiMegaphoneFill, // Represents quick actions
    description:
      'Enables hiring managers to create and manage job postings with ease. The feature includes a streamlined interface for entering job details and requirements, allowing for rapid posting without the need for complex setup or configuration.',
  },

  {
    title: 'Advanced Search & Filtering',
    icon: RiSearchLine, // Symbolizes search functionality
    description:
      'Allows hiring managers to perform detailed searches and apply complex filters to identify the best candidates based on specific criteria such as skills, experience, and educational background.',
  },
]);
</script>

<style scoped></style>
