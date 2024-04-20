<template>
  <qh-container @close="$emit('close')">
    <form
      class="mx-auto mt-10 w-full gap-4 p-2"
      @submit.prevent="submitBasicDetails"
    >
      <div class="grid grid-cols-1 gap-4">
        <qh-input
          v-for="(detail, index) in formDetails"
          v-bind="detail"
          :key="index"
          v-model="basicDetails[detail.name]"
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
const formDetails = reactive([
  {
    name: 'firstname',
    label: 'first name',
    type: 'text',
    placeholder: 'your firstname',
  },
  {
    name: 'lastname',
    label: 'last name',
    type: 'text',
    placeholder: 'your lastname',
  },
  {
    name: 'middlename',
    label: 'middle name',
    type: 'text',
    placeholder: 'your middlename',
  },
  {
    name: 'phone_number',
    label: 'phone number',
    type: 'tel',
    placeholder: 'your phone number',
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
