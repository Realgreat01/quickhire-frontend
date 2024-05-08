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
            placeholder="Javascript"
            label-name="name"
            hint="Select your top 3 skills, useful in your job search!"
            no-data-message="Kindly suggest such skill to us!"
            multiple
            :selectable="() => skills.top_skills.length < 3"
            :options="skillIcons"
            @selected="(val) => (skills.top_skills = val)"
          />
          <qh-input
            label="Programming Languages"
            type="select"
            name="programming_languages"
            placeholder="JavaScript"
            label-name="name"
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
            label-name="name"
            no-data-message="Kindly suggest such to us!"
            multiple
            :options="skillIcons"
            v-model="skills.technologies"
          />
          <qh-input
            label="Others"
            name="others"
            hint="only used in your resume"
            type="tag"
            placeholder="Microsoft Word"
            @selected="(val) => (skills.others = val)"
          />
          <qh-input
            label="Soft Skills"
            name="soft_skills"
            type="tag"
            placeholder="Team Work"
            hint="only used in your resume"
            @selected="(val) => (skills.soft_skills = val)"
          />
        </div>
        <qh-button
          type="submit"
          class="my-4 w-full"
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
  stack: '',
  top_skills: [],
  programming_languages: [],
  frameworks: [],
  technologies: [],
  others: [],
  soft_skills: [],
});

const updateUserDetails = async (field: any) => {
  const data = qhHelpers.filterEmptyValues(skills.value);
  const response = await UPDATE_USER_SKILLS(data);
  if (response.success) {
    qhToast.success('Project submitted successfully');
    await getSkills();
    qhCloseModal();
  } else qhToast.error(response.message);
};

// onMounted(() => (skills.value = userSkills.value));
</script>
