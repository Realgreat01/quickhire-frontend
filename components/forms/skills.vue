<template>
  <qh-container @close="$emit('close')" title="Skills">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-10 w-full gap-4 p-2"
        @submit.prevent="handleSubmit($event, updateUserDetails)"
      >
        <div class="grid grid-cols-1 gap-4">
          <qh-input
            label="Stack"
            name="stack"
            placeholder="Frontend Developer"
            v-model="skills.stack"
            :rules="ValidationRules.skills.stack"
          />

          <qh-input
            label="Top Skills"
            type="select"
            name="top_skills"
            label-name="name"
            hint="Select your top 3 skills, useful in your job search!"
            no-data-message="Kindly suggest such skill to us!"
            multiple
            track-by="name"
            :max="3"
            :options="skillIcons"
            v-model="skills.top_skills"
          />
          <qh-input
            label="Programming Languages"
            type="select"
            name="programming_languages"
            placeholder="JavaScript"
            label-name="name"
            track-by="name"
            no-data-message="Kindly suggest such skill to us!"
            multiple
            :options="skillIcons"
            v-model="skills.programming_languages"
          />
          <qh-input
            label="Frameworks"
            type="select"
            name="frameworks"
            placeholder="Vue Js"
            label-name="name"
            track-by="name"
            no-data-message="Kindly suggest such skill to us!"
            multiple
            :options="skillIcons"
            v-model="skills.frameworks"
          />
          <qh-input
            label="Technologies"
            type="select"
            name="technologies"
            placeholder="VS Code"
            no-data-message="Kindly suggest such to us!"
            multiple
            label-name="name"
            track-by="name"
            :options="skillIcons"
            v-model="skills.technologies"
          />
          <qh-input
            label="Others"
            name="others"
            hint="only used in your resume"
            type="select"
            multiple
            :options="skills.others"
            taggable
            placeholder="Microsoft Word"
            v-model="skills.others"
          />

          <qh-input
            label="Soft Skills"
            name="soft_skills"
            type="select"
            multiple
            taggable
            placeholder="Team Work"
            hint="only used in your resume"
            generateNewTag
            :options="skills.soft_skills"
            v-model="skills.soft_skills"
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
import { UPDATE_USER_SKILLS } from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';
import { useUserStore } from '~/store/user-store';
import { skillIcons } from '~/constants/skill';
import type { Skills } from '~/types/user';

const { getSkills } = useUserStore();
const { skills: userSkills } = storeToRefs(useUserStore());

const skills = ref<Skills | any>({
  stack: userSkills.value?.stack,
  top_skills: userSkills.value?.top_skills,
  programming_languages: userSkills.value?.programming_languages,
  frameworks: userSkills.value?.frameworks,
  technologies: userSkills.value?.technologies,
  others: userSkills.value?.others,
  soft_skills: userSkills.value?.soft_skills,
});

const updateUserDetails = async (field: any) => {
  const response = await UPDATE_USER_SKILLS(skills.value);
  if (response.success) {
    qhToast.success('Skills updated successfully');
    await getSkills();
    qhCloseModal();
  } else qhToast.error(response.message);
};
</script>
