<template>
  <div class="bg-white">
    <VueSelect
      v-if="multiple"
      v-bind="$attrs"
      :multiple="true"
      :is-clearable="false"
      :label="labelName"
      :options="options"
      v-model="modelValue"
      :placeholder="placeholder"
      class=""
    >
      <template #no-options="{ search, searching, loading }">
        <div class="flex flex-col items-center justify-center">
          <img src="~~/assets/svgs/no-data-animate.svg" class="h-32" alt="" />
          <p class="qh-text-3">{{ noDataMessage }}</p>
        </div>
      </template>
    </VueSelect>
    <VueSelect
      v-else
      v-bind="$attrs"
      :is-clearable="false"
      :options="getOptions"
      v-model="modelValue"
      :label="labelName"
      :clearable="clearable"
      :placeholder="placeholder"
    >
      <template #no-options>
        <div class="flex flex-col items-center justify-center">
          <img src="~~/assets/svgs/no-data-animate.svg" class="h-32" alt="" />
          <p class="qh-text-3">{{ noDataMessage }}</p>
        </div>
      </template>
    </VueSelect>
  </div>
</template>
<script setup lang="ts">
import { RiArrowDownSLine } from 'vue-remix-icons';
import DeSelect from '../icons/delect.vue';
import DropDown from '../icons/drop-down.vue';
import type { PropType } from 'vue';
import 'vue-select/dist/vue-select.css';
import VueSelect from 'vue-select';

const props = defineProps({
  options: {
    type: Array as PropType<any[]>,
    default: [],
    required: true,
  },
  noDataMessage: {
    type: String,
    default: 'No Data Available',
  },
  multiple: Boolean,
  labelName: String,
  placeholder: String,
  clearable: Boolean,
});

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = defineModel();

watch(modelValue, (value) => {
  emits('update:modelValue', value);
  emits('change', value);
});

VueSelect.props.components.default = () => ({
  Deselect: DeSelect,
  OpenIndicator: DropDown,
});

const getOptions = computed(() =>
  props.options.filter((option) => modelValue.value !== option),
);
// const getSelectOptions = computed(() =>
//   props.options.filter((option) => !modelValueMultiple.value.includes(option)),
// );
</script>
