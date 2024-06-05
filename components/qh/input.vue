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
          v-model="model"
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
          v-model="model"
          v-bind="$attrs"
          :placeholder="placeholder"
          @focus="handleFocus($event.target.value)"
          @change="handleCurrency($event.target.value)"
        />

        <qh-date-picker
          v-else-if="type === 'date'"
          v-model="model"
          :required="required"
          v-bind="$attrs"
          :placeholder="placeholder"
          @change="handleChange"
        />

        <qh-select
          :noDataMessage="noDataMessage"
          v-model="model"
          v-else-if="type === 'select'"
          :options="options"
          :required="required"
          v-bind="$attrs"
          :labelName="labelName"
          :placeholder="placeholder"
          @change="handleChange"
        />

        <qh-text-editor
          v-model="model"
          :required="required"
          v-bind="$attrs"
          :placeholder="placeholder"
          v-else-if="type === 'editor'"
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

        <input
          :name="name"
          :rules="rules"
          v-else-if="type === 'tag'"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          class="relative w-full"
          v-model="tagsModel"
          :placeholder="placeholder"
          @input="handleTag"
          @keydown.enter.prevent="addTags"
        />

        <Field
          v-else
          :name="name"
          :rules="rules"
          :as="as"
          :type="type"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          v-bind="$attrs"
          v-model="model"
          :placeholder="placeholder"
          class="relative w-full"
          @input="handleInput($event.target.value)"
          @change="handleChange($event.target.value)"
        />

        <qh-button
          :label="buttonText"
          v-if="buttonText"
          type="button"
          @click="actionButtonClick"
          class="center-box !right-0 h-10 transform border border-brand-500 bg-brand-500 shadow-lg shadow-gray-300"
        >
          <slot name="buttonText">{{ buttonText }}</slot>
        </qh-button>

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

      <div class="mt-0" v-if="type === 'tag'">
        <h2 class="qh-text-4 text-error">
          Separate each item with a comma (,)
        </h2>
        <div class="flex flex-wrap gap-2">
          <qh-button
            v-for="(tag, index) in tags"
            :key="index"
            type="button"
            class="qh-text-4 relative flex gap-x-4 !bg-dark-100 !py-2 px-4 !text-dark"
          >
            <span class=""> {{ tag }}</span>
            <XMarkIcon
              class="h-6 w-6 stroke-dark stroke-1 text-dark-600"
              @click.self.prevent.once="removeTag(index)"
            />
          </qh-button>
        </div>
      </div>
      <p class="mr-4 max-w-[96%] text-sm text-dark-300" v-if="hint">
        {{ hint }}
      </p>
      <ErrorMessage :name="name" v-slot="{ message }" v-if="!hideErrorMessage">
        <span class="qh-text-4 ml-1 text-error first-letter:!capitalize">{{
          message
        }}</span>
      </ErrorMessage>
      <p v-if="serverErrors && serverErrors[name]">
        <span class="qh-text-4 ml-1 text-error first-letter:!capitalize">{{
          serverErrors[name]
        }}</span>
      </p>
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
import { XMarkIcon } from '@heroicons/vue/24/solid';
import type { PropType } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: [String, Boolean], default: '' },
  rules: Object,
  required: Boolean,
  as: { type: String, default: 'input' },
  type: { type: String, default: 'text' },
  errors: Object,
  serverErrors: Object,
  hint: String,
  buttonText: String,
  labelClass: String,
  labelName: String,
  suffix: String,
  options: { type: Array as PropType<any[]>, default: [] },
  noDataMessage: String,
  placeholder: String,
  hasCheckbox: Boolean,
  hideErrorMessage: Boolean,
  checkboxText: { type: String, default: 'This should be a chekbox content' },
});

const model = defineModel({ default: null });
const modelValue = ref<any>(model.value);

const checkBox = ref(false);

const tags = ref<any>(model.value);
const tagsModel = ref('');

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

const handleTag = () => {
  const parts = tagsModel.value
    .split(',')
    .map((part: string) => part.trim())
    .filter((part: string) => part);
  if (parts.length > 1) {
    tags.value.push(...parts.slice(0, -1));
    tagsModel.value = parts.slice(-1)[0];
  }
};

function addTags(value: any) {
  if (tagsModel.value) {
    tags.value.push(
      ...tagsModel.value
        .split(',')
        .map((tag: any) => tag.trim())
        .filter((tag: any) => tag),
    );
    tagsModel.value = '';
  }
}

function removeTag(index: number) {
  tags.value.splice(index, 1);
}

const handleChange = (value: any) => {
  emit('update:modelValue', value);
  emit('change', value);
  emit('selected', value);
};

const actionButtonClick = () => {
  return emit('button-click');
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
watch(
  () => props.serverErrors,
  (errors: any) => {
    if (errors[props.name]) errorAvailable.value = true;
    else errorAvailable.value = false;
  },
);
watch(
  () => model.value,
  (errors: any) => {
    errorAvailable.value = false;
    if (props.serverErrors) props.serverErrors[props.name] = null;
    if (props.errors) props.errors[props.name] = null;
  },
);

watch(
  tags,
  (newTags) => {
    emit('selected', newTags);
  },
  { deep: true },
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

  &:focus {
    @apply ring-[0.5px] !ring-brand;
  }

  /* // @apply block w-full border ansparent  focus:border-2 focus:border-green-400 focus:outline-none; */
}
</style>
