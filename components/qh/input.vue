<template>
  <div class="form-box">
    <!-- Simplified conditional rendering -->
    <label
      :for="name"
      :class="labelClass"
      class="flex gap-x-1 text-base font-medium !capitalize !text-brand"
    >
      <slot v-if="$slots.default"></slot>
      <template v-else>
        <span>{{ label }} </span>
      </template>

      <span class="!font-normal text-error" v-if="required">*</span>
    </label>
    <div class="">
      <div class="relative">
        <Field
          :name="name"
          :rules="rules"
          v-if="type === 'number'"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          class="relative w-full"
          v-model="modelValue"
          v-bind="$attrs"
          :placeholder="placeholder"
          @focus="handleFocus($event.target.value)"
          @change="handleNumbers($event.target.value)"
        />

        <Field
          :name="name"
          :rules="rules"
          v-else-if="type === 'currency'"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          class="relative w-full"
          v-model="modelValue"
          v-bind="$attrs"
          :placeholder="placeholder"
          @focus="handleFocus($event.target.value)"
          @change="handleCurrency($event.target.value)"
        />

        <qh-date-picker
          v-else-if="type === 'date'"
          v-model="modelValue"
          :required="required"
          v-bind="$attrs"
          :placeholder="placeholder"
          @change="handleChange"
        />

        <qh-select
          :noDataMessage="noDataMessage"
          v-model="selectedModel"
          v-else-if="type === 'select'"
          :options="options"
          :required="required"
          :multiple="multiple"
          v-bind="$attrs"
          :labelName="labelName"
          :placeholder="placeholder"
          @change="handleChange"
        />

        <qh-text-editor
          v-model="modelValue"
          :required="required"
          v-bind="$attrs"
          :placeholder="placeholder"
          v-else-if="type === 'editor'"
          @change="handleChange"
        />

        <Field
          :name="name"
          :rules="rules"
          :type="passwordType"
          v-model="modelValue"
          v-bind="$attrs"
          :placeholder="placeholder"
          v-else-if="type === 'password'"
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
          v-model="modelValue"
          :placeholder="placeholder"
          class="relative w-full"
          @input="handleInput($event.target.value)"
          @change="handleChange($event.target.value)"
        />

        <qh-button
          :label="buttonText"
          v-if="buttonText"
          @click="actionButtonClick"
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

      <p
        class="mx-4 max-w-[80%] text-sm font-medium text-brand-400"
        v-if="hint"
      >
        {{ hint }}
      </p>
      <ErrorMessage :name="name" v-slot="{ message }">
        <span class="qh-text-4 ml-1 text-error first-letter:!capitalize">{{
          message
        }}</span>
      </ErrorMessage>
      <div class="ml-2 mt-1 flex items-center gap-x-2" v-if="hasCheckbox">
        <input
          type="checkbox"
          v-model="checkBox"
          class="block h-4 w-4 accent-brand"
          @input="handleCheckbox"
        />
        <span class="qh-text-4 block text-dark-400">{{ checkboxText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { RiEyeOffLine, RiEyeLine } from 'vue-remix-icons';
import type { PropType } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: [String, Boolean], default: '' },
  rules: Object,
  required: Boolean,
  clearable: Boolean,
  as: { type: String, default: 'input' },
  type: { type: String, default: 'text' },
  errors: Object,
  hint: String,
  buttonText: String,
  labelClass: String,
  labelName: String,
  suffix: String,
  options: { type: Array as PropType<any[]>, default: [] },
  multiple: Boolean,
  noDataMessage: String,
  placeholder: String,

  hasCheckbox: Boolean,
  checkboxText: { type: String, default: 'This should be a chekbox content' },
});

const modelValue = ref<string | number>('');

const selectedModel = ref([]);

const checkBox = ref(false);

const emit = defineEmits([
  'update:modelValue',
  'update:selected',
  'update:checkbox',
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

const handleCheckbox = async (value: any) => {
  await nextTick();
  setTimeout(() => emit('update:checkbox', checkBox.value), 100);
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

const handleCurrency = async (value: string) => {
  await nextTick();
  const currency = qhNumbers.formatCurrency(value) as string;
  emit('update:modelValue', qhNumbers.convertCurrencyToNumber(currency));
  modelValue.value = currency;
};

const handleNumbers = async (value: string) => {
  await nextTick();
  const number = qhNumbers.formatNumber(value) as string;
  emit('update:modelValue', qhNumbers.convertCurrencyToNumber(number));
  modelValue.value = number;
};

const handleFocus = async (value: string) => {
  modelValue.value = qhNumbers.convertCurrencyToNumber(value);
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

input,
textarea {
  @apply border border-dark-50 text-dark-400;
  background: #ffffff;
  outline: none;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;

  :disabled {
    color: #a0bdba;
  }

  /* // @apply block w-full border ring-transparent  focus:border-2 focus:border-green-400 focus:outline-none; */
}
</style>
