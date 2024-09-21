<template>
  <div class="flex flex-col p-2 lg:p-10" id="experience">
    <qh-section-title>Experience</qh-section-title>
    <div
      class="grid grid-cols-[1px,1fr] items-center gap-x-4 pl-2 md:gap-x-6 md:pl-4"
      v-for="(experience, index) in user?.experience"
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
      <nuxt-link external :to="experience.company_website">
        <qh-card class="mb-4 flex-1 md:m-4 md:p-6">
          <div class="flex w-full flex-col justify-between md:flex-row">
            <h1 class="qh-text-3 font-bold uppercase text-brand">
              {{ experience.role }}
            </h1>
            <div class="hidden gap-x-1 md:flex">
              <h1 class="text-brand">
                {{ qhDates.resumeDate(experience.start_date) }}
              </h1>
              -
              <h1 class="text-brand">
                {{ qhDates.resumeDate(experience.end_date) }}
              </h1>
            </div>
          </div>

          <div class="flex flex-col gap-x-4 md:flex-row">
            <h2 class="mb-2 text-base font-medium text-secondary">
              {{ experience.company }}
            </h2>
            <div
              class="flex gap-x-1 text-sm font-medium text-dark-400 md:hidden"
            >
              <h1 class="">
                {{ qhDates.shortDate(experience.start_date) }}
              </h1>
              -
              <h1 class="">
                {{ qhDates.shortDate(experience.end_date) }}
              </h1>
            </div>
            <div
              class="qh-text-4 flex w-full justify-between text-sm capitalize md:ml-auto md:w-fit md:justify-start md:gap-x-4"
            >
              <p class="">{{ experience.job_type }}</p>
              <p class="">{{ experience.location_type }}</p>
            </div>
          </div>

          <p
            class="qh-text-4 mt-2 md:w-4/5"
            v-html="experience.contributions"
          ></p>
        </qh-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
</script>

<style scoped lang="scss"></style>
