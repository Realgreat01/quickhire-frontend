<template>
  <div class="w-full">
    <qh-input
      :label="label"
      name=""
      class="my-2 md:w-3/5"
      v-model="searchValue"
      :placeholder="placeholder"
    />
    <EasyDataTable
      :headers="headers"
      v-bind="$attrs"
      :items="items"
      theme-color="#023696"
      :search-field="searchField"
      :search-value="searchValue"
      :sort-by="sortBy"
      :sort-type="sortType"
      buttons-pagination
      hide-rows-per-page
      @click-row="emit('click-row')"
    >
      <template #header="header">
        <p
          :class="header.class"
          class="qh-flex-center my-2 h-10 w-full text-center text-base font-bold text-brand"
        >
          {{ header.text }}
        </p>
      </template>

      <template #empty-message>
        <div class="flex flex-col items-center justify-center">
          <img src="~~/assets/svgs/no-data-animate.svg" class="h-32" alt="" />
          <!-- <p class="qh-text-3">{{ noDataMessage }}</p> -->
        </div>
      </template>

      <template v-slot:item-posted_by="job">
        <div class="flex min-w-48 gap-x-2">
          <img
            src="~~/assets/images/company-logo.jpg"
            alt=""
            class="block h-12"
          />
          <!-- 2 -->
          <div class="">
            <h1 class="qh-text-3 font-semibold">{{ job.job_title }}</h1>
            <h1 class="qh-text-3 text-brand">
              {{ job.posted_by?.company_name }}
            </h1>
            <h1 class="qh-text-4">
              {{ job.posted_by?.company_location }}
            </h1>
          </div>
        </div>
      </template>

      <template v-slot:item-job_type="job">
        <div class="qh-flex-center min-w-20 flex-col">
          <h4 class="qh-text-4 font-semibold text-brand">
            {{ job.job_type }}
          </h4>
          <h4 class="qh-text-4 font-semibold">
            {{ qhNumbers.formatCurrency(job.salary) }}
          </h4>
        </div>
      </template>

      <template v-slot:item-isActive="job"
        ><div class="qh-flex-center">
          <qh-button
            class="flex h-8 w-28 gap-x-4 rounded-full bg-success-400"
            v-if="job.isActive"
          >
            <span class="">Active</span>
            <RiCheckboxCircleFill class="h-5 w-5 rounded-full" />
          </qh-button>

          <qh-button
            v-else
            class="flex h-8 w-28 gap-x-4 rounded-full bg-error-400"
            ><span class="">Closed</span>
            <!-- <RiCloseCircleFill class="h-5 w-5 rounded-full" /> -->
          </qh-button>
        </div>
      </template>
      <template v-slot:item-posted_on="job">
        <div class="qh-text-4 min-w-60 text-center">
          <h4 class="font-medium">
            {{ qhDates.getReadableDate(job.posted_on) }}
            -
            {{ qhDates.getReadableDate(job.application_ends) }}
          </h4>
          <h4 class="">
            <span class="text-secondary-600">
              {{ qhNumbers.formatNumber(2000 * 0.678) }}</span
            >
            Applicants
          </h4>
        </div>
      </template>

      <template v-slot:item-required_skills="job">
        <div
          class="flex h-full w-full min-w-60 flex-wrap items-center justify-center gap-2"
        >
          <i
            :class="skill.icon"
            v-for="skill in job.required_skills"
            class="colored h-10 text-2xl"
          ></i>
        </div>
      </template>
      <template v-slot:item-action>
        <div class="flex items-center justify-center gap-x-6">
          <h4 class="rounded-full border border-brand p-2">
            <RiShareLine class="h-4 w-4 fill-brand !stroke-none" />
          </h4>
          <qh-button
            class="h-10 w-20 rounded-full border border-brand bg-transparent font-medium !text-brand hover:bg-brand-200"
            >Apply
          </qh-button>
        </div>
      </template>

      <slot> </slot>
    </EasyDataTable>
  </div>
</template>

<script setup lang="ts">
import EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import type { Header, Item, SortType } from 'vue3-easy-data-table';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiShareLine,
} from 'vue-remix-icons';

const emit = defineEmits(['click-row']);
const props = defineProps({
  hasSearch: { type: Boolean, default: true },
  placeholder: { type: String, default: 'Search for jobs' },
  items: { type: Array, required: true },
  headers: { type: Array, required: true },
  searchField: { type: Array },
  label: { type: String },
  sortType: { type: String as PropType<SortType> },
  sortBy: { type: String },
});

const searchValue = ref('');

// const headers: Header[] = [
//   { text: 'PLAYER', value: 'player' },
//   { text: 'TEAM', value: 'team' },
//   { text: 'NUMBER', value: 'number' },
//   { text: 'POSITION', value: 'position' },
//   { text: 'HEIGHT', value: 'indicator.height' },
//   { text: 'WEIGHT (lbs)', value: 'indicator.weight', sortable: true },
//   { text: 'LAST ATTENDED', value: 'lastAttended', width: 200 },
//   { text: 'COUNTRY', value: 'country' },
// ];
</script>

<style scoped></style>
