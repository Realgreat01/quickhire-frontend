<template>
  <qh-container @close="$emit('close')" title="education">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <form
        class="mx-auto mt-4 w-full"
        @submit.prevent="handleSubmit($event, submitEducation)"
      >
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <qh-input
            label="Institution Name"
            type="text"
            name="institution"
            class="md:col-span-2"
            v-model="education.institution"
            :rules="ValidationRules.education.institutionName"
            required
          />

          <qh-input
            label="Course of Study"
            type="text"
            name="course"
            class="md:col-span-2"
            v-model="education.course"
            :rules="ValidationRules.education.courseOfStudy"
            required
          />

          <qh-input
            label="Degree Type"
            type="select"
            name="type"
            v-model="education.type"
            required
            :options="[
              'Bachelors',
              'Masters',
              'Doctorate',
              'Elementary',
              'Diploma',
              'High School',
              'Certificate',
              'Associate Degree',
              'Professional Training',
            ]"
          />

          <qh-input
            label="School Website"
            type="text"
            name="school_website"
            v-model="education.school_website"
            :rules="ValidationRules.URL"
          />

          <qh-input
            label="Entry Date"
            type="date"
            name="entryDate"
            v-model="education.entry_date"
            :rules="ValidationRules.education.entryDate"
            required
          />

          <qh-input
            label="Graduation Date"
            type="date"
            name="graduationDate"
            v-model="education.graduation_date"
            hint="Expected graduation date"
            :rules="ValidationRules.education.graduationDate"
            required
          />

          <qh-input
            label="Description"
            type="editor"
            name="description"
            class="md:col-span-2"
            v-model="education.description"
          />
        </div>
        <qh-button
          type="submit"
          class="mt-4 h-10 w-full p-1"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
        />
      </form>
    </VeeForm>
  </qh-container>
</template>

<script setup lang="ts">
import {
  ADD_USER_EDUCATION,
  EDIT_USER_EDUCATION,
} from '~/services/user.service';
import { Form as VeeForm } from 'vee-validate';
import type { Education } from '~/types/user';
import { useUserStore } from '~/store/user-store';

const { getEducation } = useUserStore();
const { educations } = storeToRefs(useUserStore());
const route = useRoute();
const emit = defineEmits(['close']);

const education = ref<Education | any>({
  institution: '',
  course: '',
  type: '',
  school_website: '',
  description: '',
  entry_date: '',
  graduation_date: '',
});

const submitEducation = async (field: any) => {
  if (route.query.id && route.query.edit) {
    // Edit Experience
    const response = await EDIT_USER_EDUCATION(
      education.value,
      route.query.id as string,
    );
    if (response.success) {
      qhToast.success('Experience updated successfully');
    } else qhToast.error(response.message);
  } else {
    // Add New Experience
    const response = await ADD_USER_EDUCATION(education.value);
    if (response.success) {
      qhToast.success('Experience added successfully');
    } else qhToast.error(response.message);
  }
  await getEducation();
  qhCloseModal();
};

onMounted(() => {
  if (route.query.edit && route.query.id) {
    education.value = educations.value?.find(
      (education) => education._id === route.query.id,
    );
  }
});
</script>
