<template>
  <qh-container @close="$emit('close')">
    <form class="mx-auto mt-10 w-full p-2" @submit.prevent="submitBasicDetails">
      <div class="grid grid-cols-2 gap-4">
        <qh-input
          v-for="(experience, index) in experienceList"
          :key="index"
          v-bind="experience"
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
defineProps({
  isProp: {
    type: Boolean,
    default: false,
  },
});
const experienceList = ref([
  {
    label: 'Company Name',
    type: 'text',
    name: 'company',
    class: 'qh-full-width',
  },
  {
    label: 'Role / Position',
    type: 'text',
    name: 'role',
    class: 'qh-full-width',
  },
  { label: 'Start Date', type: 'month', name: 'startDate' },
  { label: 'End Date', type: 'month', name: 'endDate' },
]);
</script>
