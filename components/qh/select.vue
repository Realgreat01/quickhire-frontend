<template>
  <div>
    <Multiselect
      :options="options"
      v-model="modelValue"
      v-bind="$attrs"
      ref="multiSelect"
      :multiple="multiple"
      :label="labelName"
      :hide-selected="true"
      :allowEmpty="false"
      :showLabels="false"
      :taggable="taggable"
      class="!bg-transparent"
      tagPosition="bottom"
      :tagPlaceholder="tagPlaceholder ?? 'Create New Item'"
      :placeholder="$attrs.placeholder ?? 'Select One'"
    >
      <template #caret="{ toggle }">
        <RiArrowDownSLine
          @mousedown.prevent="toggle"
          class="multiselect__select"
        />
      </template>
      <!-- <template #tag="{ option, remove }" v-if="labelName">
        <div
          class="mb-2 mr-2 inline-flex w-fit items-center justify-between gap-x-4 rounded-lg bg-brand px-2 py-1 text-white"
        >
          <span class=""> {{ option[labelName] }}</span>
          <RiCloseLine class="h-6 w-6" @click="remove" />
        </div>
      </template> -->
    </Multiselect>
  </div>
</template>

<script setup lang="ts">
import { RiArrowDownSLine, RiCloseLine } from 'vue-remix-icons';

import Multiselect from 'vue-multiselect';
const modelValue = defineModel<any>();
const multiSelect = ref();
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
  tagPlaceholder: String,
  labelName: String,
  clearable: Boolean,
  taggable: Boolean,
});

// function addTag(tag: string) {
//   if (props.taggable) {
//     console.log(tag);
//     // modelValue.value.push(tag);
//     // props.options.push(tag);
//   } else return;
// }
</script>
