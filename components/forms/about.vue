<template>
  <qh-container @close="$emit('close')" title="About">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, submitAboutDetails)"
      >
        <div class="grid gap-4">
          <qh-input
            label="Short Bio"
            type="text"
            name="header_bio"
            placeholder="Software Developer | Technical Writer | Builder of the Universe 🌟🎉"
            v-model="about.header_bio"
            :rules="ValidationRules.about.header_bio"
          />

          <qh-input
            label="Profile Headline"
            type="editor"
            hint="Used only in resumè, include things like your skills proficiencies and others"
            name="profile_headline"
            :placeholder="profileHeadline"
            v-model="about.profile_headline"
            as="textarea"
            :rules="ValidationRules.about.summary"
          />

          <qh-input
            label="Summary"
            type="text"
            hint="Used only in resumè, not you can use the profile headline option above alone too"
            name="summary"
            placeholder="A software developer with over 4 years experience"
            v-model="about.summary"
            as="textarea"
            :rules="ValidationRules.about.summary"
          />

          <qh-input
            label="About"
            type="editor"
            name="about_me"
            placeholder="Hi, I am Samson Ikuomenisan a proficient VueJS developer with over 4 years experience"
            v-model="about.about_me"
            as="textarea"
            :rules="ValidationRules.about.about_me"
          />

          <qh-input
            label="Interests"
            name="interests"
            type="select"
            taggable
            multiple
            placeholder="Open Source"
            :options="developerInterests"
            v-model="about.interests"
          />
          <qh-input
            label="Hobbies"
            name="hobbies"
            type="select"
            taggable
            multiple
            placeholder="Watching Movies"
            :options="developerHobbies"
            v-model="about.hobbies"
          />
        </div>
        <qh-button
          type="submit"
          class="mt-4 !h-12 w-full"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>

    <!--  -->
  </qh-container>
</template>

<script setup lang="ts">
import { EDIT_USER_DETAILS } from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';
import type { User } from '~/types/user';

import { useUserStore } from '~/store/user-store';

const { getCurrentUser } = useUserStore();
const { user } = storeToRefs(useUserStore());
const developerInterests = [
  'Open Source Contributions',
  'Participation in Hackathons',
  'Tech Blogging',
  'Continuous Learning (Courses, Workshops)',
  'Mentorship in Coding',
  'Attendance at Tech Meetups and Conferences',
  'Gaming',
  'Robotics and DIY Projects',
  'Digital Art and Design',
  'Volunteering for Tech-Driven Non-Profits',
];
const developerHobbies = [
  'Building Personal Projects with New Technologies',
  'Blogging or Podcasting on Tech Topics',
  'Participating in 3D Printing Projects',
  'Photography',
  'Playing Chess',
  'Fitness and Outdoor Activities',
  'Playing Musical Instruments',
  'Volunteering in Community Services',
  'Reading Science Fiction and Technology Books',
  'Traveling and Exploring New Cultures',
];

const profileHeadline = ref(
  `Profound knowledge of Vue.js, React, and TypeScript
Knowledge of other frontend frameworks like Tailwind CSS, Svelte, Nuxt.js, Astro, etc.
Web performance optimization.
Exceptional problem-solving skills`,
);

const about = ref<User | any>({
  about_me: user.value?.about_me,
  header_bio: user.value?.header_bio,
  summary: user.value?.summary,
  hobbies: user.value?.hobbies,
  interests: user.value?.interests,
  profile_headline: user.value?.profile_headline,
});

const submitAboutDetails = async (field: any) => {
  const response = await EDIT_USER_DETAILS(about.value);
  if (response.success) {
    qhToast.success('Details submitted successfully');
    qhCloseModal();
    getCurrentUser();
  } else qhToast.error(response.message);
};
</script>
