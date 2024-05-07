<template>
  <div>
    <h1 class="qh-text-1 mb-4 mt-20 md:mb-5">Features</h1>

    <div class="grid gap-4 md:grid-cols-3">
      <div
        class="rounded-2xl border bg-white p-6 py-10"
        v-for="(feature, index) in features"
      >
        <div class="flex items-start gap-x-4 md:h-10">
          <component
            :is="feature.icon"
            class="block h-6 w-6 fill-secondary-500 md:h-8 md:w-8"
          />

          <h4 class="qh-text-3 mb-4 font-semibold text-brand md:mb-8">
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

defineProps({ Class: String });

const features = shallowRef([
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
