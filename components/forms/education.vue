<template>
  <qh-container @close="$emit('close')">
    <form @submit.prevent="submitEducation" class="mx-auto mt-10 w-full p-2">
      <div class="grid grid-cols-2 gap-4">
        <qh-input
          v-for="(education, index) in educationList"
          :key="index"
          v-bind="education"
          v-model="educationDetail[education.name]"
          class="block w-full rounded bg-transparent p-2 text-white"
        />
      </div>
      <qh-button
        type="submit"
        label="Submit"
        class="mt-4 h-10 w-full p-1"
        @click="
          push.success({
            message: 'Your message has been successfully.',
          })
        "
      />
    </form>
  </qh-container>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});

const educationList = ref([
  {
    label: 'Institution Name',
    name: 'institution',
    type: 'text',
    class: 'qh-full-width',
  },
  {
    label: 'Course of Study',
    name: 'course',
    type: 'text',
    class: 'qh-full-width',
  },
  {
    label: 'Entry Date',
    name: 'entryDate',
    type: 'month',
  },
  {
    label: 'Graduation Date',
    name: 'graduationDate',
    type: 'month',
  },
]);
const educationDetail = ref({
  institution: '',
  course: '',
  entryDate: '',
  graduationDate: '',
});
</script>
