<template>
  <div class="form-box">
    <!-- Simplified conditional rendering -->
    <label
      :for="name"
      :class="labelClass"
      class="flex gap-x-1 text-base font-semibold !capitalize !text-brand"
    >
      <slot v-if="$slots.default"></slot>
      <template v-else>
        <span>{{ label }} </span>
      </template>

      <span class="!font-nokwrmal text-error" v-if="required">*</span>
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
          @focus="handleFocus($event.target.value)"
          @change="handleCurrency($event.target.value)"
        />

        <qh-date-picker
          v-else-if="type === 'date'"
          v-model="modelValue"
          :required="required"
          @change="handleChange"
        />

        <qh-select
          :noDataMessage="noDataMessage"
          v-model="selectedModel"
          v-else-if="type === 'select'"
          :options="options"
          :required="required"
          :multiple="multiple"
          @change="handleChange"
        />

        <qh-text-editor
          v-model="modelValue"
          :required="required"
          v-else-if="type === 'editor'"
          @change="handleChange"
        />

        <Field
          :name="name"
          :rules="rules"
          :type="passwordType"
          v-model="modelValue"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { RiEyeOffLine, RiEyeLine } from 'vue-remix-icons';
import { type Option } from 'vue3-select-component';
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
  suffix: String,
  labelName: { type: String, default: 'label' },
  options: { type: Array as PropType<any[]>, default: [] },
  multiple: Boolean,
  noDataMessage: String,
});
const {
  formatCurrency,
  formatNumberWithSuffix,
  convertCurrencyToNumber,
  formatNumber,
} = useCurrency();

const modelValue = ref<string | number>('');

const selectedModel = ref([]);

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

const handleCurrency = async (value: string) => {
  await nextTick();
  const currency = formatCurrency(value) as string;
  emit('update:modelValue', convertCurrencyToNumber(currency));
  modelValue.value = currency;
};

const handleNumbers = async (value: string) => {
  await nextTick();
  const number = formatNumber(value) as string;
  emit('update:modelValue', convertCurrencyToNumber(number));
  modelValue.value = number;
};

const handleFocus = async (value: string) => {
  modelValue.value = convertCurrencyToNumber(value);
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
