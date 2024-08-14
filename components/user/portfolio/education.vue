<template>
  <div class="flex flex-col p-2 md:p-10" id="education">
    <qh-section-title>Education</qh-section-title>
    <div
      class="grid grid-cols-[1px,9fr] items-center gap-x-4 pl-2 md:gap-x-6 md:pl-4"
      v-for="(education, index) in user?.education"
      :key="index"
    >
      <div
        class="relative flex h-full w-[1px] items-center justify-center bg-brand-400"
      >
        <h1
          class="absolute flex h-7 w-7 items-center justify-center rounded-full bg-brand p-1 text-xs text-white"
        >
          {{ qhNumbers.formatIncrements(index + 1) }}
        </h1>
      </div>

      <qh-card class="mb-4 min-h-40 flex-1 md:m-4 md:p-6">
        <div class="flex w-full flex-col justify-between md:flex-row">
          <h1 class="qh-text-3 font-bold uppercase text-brand">
            {{ education.course }}
          </h1>
          <div class="hidden gap-x-1 md:flex">
            <h1 class="text-brand">
              {{ qhDates.resumeDate(education.entry_date) }}
            </h1>
            -
            <h1 class="text-brand">
              {{ qhDates.resumeDate(education.graduation_date) }}
            </h1>
          </div>
        </div>

        <div class="flex flex-col md:flex-row">
          <h2
            class="my-2 flex flex-col gap-2 text-base font-semibold text-secondary"
          >
            <h2 class="qh-text-3">{{ education.institution }}</h2>
            <div
              class="qh-text-4 flex gap-x-1 font-medium text-dark-400 md:hidden"
            >
              <h1 class=" ">
                {{ qhDates.shortDate(education.entry_date) }}
              </h1>
              -
              <h1 class="">
                {{ qhDates.shortDate(education.graduation_date) }}
              </h1>
            </div>
            <div class="flex gap-x-4">
              <qh-button class="qh-text-5 !h-6" variant="outlined">
                {{ education.type }}
              </qh-button>
              <qh-button class="qh-text-5 !h-6" variant="outlined">
                <a class="font-medium" :href="education.school_website"
                  >{{ qhHelpers.formatWebsiteName(education.school_website) }}
                </a>
              </qh-button>
            </div>
          </h2>
        </div>

        <p class="qh-text-4 py-4 md:w-3/5" v-html="education.description"></p>
      </qh-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
</script>

<style scoped lang="scss"></style>
