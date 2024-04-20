<template>
  <div class="form-box">
    <!-- Simplified conditional rendering -->
    <label
      :for="name"
      :class="labelClass"
      class="flex gap-x-1 text-base font-semibold !capitalize text-brand-800"
    >
      <slot v-if="$slots.default"></slot>
      <template v-else>
        <span>{{ label }} </span>
      </template>

      <span class="text-red-500" v-if="required">*</span>
    </label>
    <div class="">
      <div class="relative">
        <Field
          :name="name"
          :rules="rules"
          :type="passwordType"
          v-if="type === 'password'"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          class="relative w-full"
          @input="handleInput($event.target.value)"
        />

        <Field
          v-else
          :name="name"
          :rules="rules"
          :as="as"
          :type="type"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          v-bind="$attrs"
          class="relative w-full"
          @input="handleInput($event.target.value)"
          @change="handleChange($event.target.value)"
        />

        <qh-button
          :label="buttonText"
          v-if="buttonText"
          @click.stop="actionButtonClick"
          class="center-box transform border border-gray-300 bg-gray-300 !text-black shadow-lg shadow-gray-300"
        />

        <RiEyeOffLine
          v-if="type === 'password' && passwordType === 'password'"
          @click="showPassword()"
          class="center-box h-6 w-6 cursor-pointer text-dark-400"
        />

        <RiEyeLine
          v-if="type === 'password' && passwordType === 'text'"
          @click="hidePassword()"
          class="center-box h-6 w-6 cursor-pointer text-dark-400"
        />
      </div>

      <p class="text-sm font-medium text-gray-500" v-if="hint">
        {{ hint }}
      </p>
      <ErrorMessage :name="name" class="form-error" v-slot="{ message }">
        <span class="form-error">{{ message }}</span>
      </ErrorMessage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { RiEyeOffLine, RiEyeLine } from 'vue-remix-icons';
import { ref } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: [String, Boolean], default: '' },
  rules: Object,
  required: Boolean,
  currency: Boolean,
  as: { type: String, default: 'input' },
  type: { type: String, default: 'text' },
  errors: Object,
  hint: String,
  buttonText: String,
  labelClass: String,
  selectOptions: Array,
  optionAttribute: { type: String, default: 'name' },
});

const modelValue = ref('');
const selectItem = ref('shshahsaj');
const emit = defineEmits([
  'update:modelValue',
  'update:selected',
  'input',
  'change',
  'button-click',
  'selected',
]);

const passwordType = ref('password');

const handleInput = (value: any) => {
  emit('update:modelValue', value);
  emit('input', value);
};

const handleChange = (value: any) => {
  emit('update:modelValue', value);
  emit('change', value);
};

const actionButtonClick = () => {
  emit('button-click');
};

const actionSelectedOptions = (value: any) => {
  emit('update:selected', value);
};

const showPassword = () => {
  passwordType.value = 'text';
};

const hidePassword = () => {
  passwordType.value = 'password';
};

const errorAvailable = ref(false);

watch(
  () => props.errors,
  (errors: any) => {
    if (errors[props.name]) errorAvailable.value = true;
    else errorAvailable.value = false;
  },
);
</script>

<style scoped>
.center-box {
  @apply absolute right-2 top-1/2 -translate-y-1/2 transform;
}
</style>
