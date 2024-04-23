<template>
  <qh-container @close="$emit('close')">
    <form class="mx-auto mt-10 w-full gap-4 p-2" @submit.prevent="">
      <div class="grid grid-cols-1 gap-4">
        <qh-input
          v-for="(detail, index) in formDetails"
          v-bind="detail"
          :key="index"
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
import QH_CONSTANTS from '~/constants';

defineProps({
  isProp: {
    type: Boolean,
    default: false,
  },
});
const formDetails = ref([
  {
    name: 'phone',
    label: 'phone',
    type: 'tel',
    placeholder: 'Your phone number',
  },
  {
    name: 'github',
    label: 'github',
    type: 'url',
    placeholder: 'https://www.github.com/' + QH_CONSTANTS.USERNAME,
  },
  {
    name: 'twitter',
    label: 'twitter',
    type: 'url',
    placeholder: 'https://www.twitter.com/' + QH_CONSTANTS.USERNAME,
  },
  {
    name: 'linkedin',
    label: 'linkedin',
    type: 'url',
    placeholder: 'https://www.linkedin.com/in/' + QH_CONSTANTS.USERNAME,
  },
]);

const basicDetails = ref({
  firstname: '',
  lastname: '',
  middlename: '',
  phone_number: '',
  gender: '',
});
</script>
