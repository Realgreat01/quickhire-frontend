<template>
  <div
    class="sentence rounded-lg border border-[#d0d5dd] bg-white px-2 py-1"
    :class="{ 'disabled-class': disabled }"
  >
    <DatePicker
      v-model="date"
      v-bind="$attrs"
      :auto-apply="autoApply"
      :enable-time-picker="false"
      month-name-format="long"
      :format="autoApply ? qhDates.formatDate : undefined"
      :clearable="false"
      no-today
      input-class-name="qh-calendar-input"
      calendar-class-name="qh-calendar"
      calendar-cell-class-name="qh-calendar-cell"
      menu-class-name="qh-calendar-menu"
      :teleport="true"
      :disabled="disabled"
      :required="required"
    >
      <template #calendar-header="{ day }">
        <div class="qh-menu">{{ day }}</div>
      </template>

      <template #input-icon>
        <RiCalendar2Line class="h-6 w-6 justify-end fill-dark-300" />
      </template>

      <template #arrow-left>
        <RiArrowLeftFill class="h-6 w-6 fill-dark-300" />
      </template>
      <template #arrow-right>
        <RiArrowRightFill class="h-6 w-6 fill-dark-300" />
      </template>
    </DatePicker>
  </div>
</template>

<script setup lang="ts">
import DatePicker from '@vuepic/vue-datepicker';
import {
  RiCalendar2Line,
  RiArrowLeftFill,
  RiArrowRightFill,
} from 'vue-remix-icons';

const props = defineProps({
  disabled: Boolean,
  autoApply: { type: Boolean, default: true },
  required: { type: Boolean, default: false },
});

const date = defineModel<Date | Date[] | string | string[] | null>('');
</script>

<style lang="scss">
.qh-calendar-cell {
  @apply rounded-full;
}
.qh-calendar-menu {
  @apply rounded-lg;
}

.qh-calendar {
  @apply text-dark-400;
}
.qh-calendar-input {
  @apply border-none  border-white  bg-white text-dark-400  disabled:bg-dark-100;
}

.qh-menu {
  color: #023696;
  font-weight: 600;
}

.disabled-class {
  @apply cursor-not-allowed bg-dark-100;
}
</style>
