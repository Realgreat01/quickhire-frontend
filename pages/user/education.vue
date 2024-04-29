<template>
  <div class="flex flex-wrap gap-6 rounded">
    <div class="flex flex-wrap gap-6 rounded">
      <qh-card
        class="flex h-fit flex-col items-start justify-between rounded px-4 py-6 md:w-2/3 md:px-12 md:py-8"
        :class="index % 2 === 0 ? '' : 'justify-self-end'"
        v-for="(education, index) in educations"
        :key="index"
      >
        <div class="flex">
          <RiSchoolFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-3 font-semibold">{{ education.institution }}</h2>
        </div>

        <div class="flex">
          <RiGraduationCapFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4 font-semibold">Bachelors</h2>
        </div>

        <div class="flex">
          <RiBookFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4 font-medium">{{ education.course }}</h2>
        </div>

        <div class="flex">
          <RiGlobalFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4">www.uniben.edu</h2>
        </div>

        <div class="flex">
          <RiCalendarFill class="icon !h-6 !w-6" />
          <h2 class="text-brand-text text-sm font-thin">
            <span class="">{{ formatDate(education.entryDate) }}</span>
            -
            <span class="">{{ formatDate(education.graduationDate) }}</span>
          </h2>
        </div>

        <div class="flex">
          <RiArticleFill class="icon !h-6 !w-6" />
          <h2 class="qh-text-4 w-fit">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            ullam, totam mollitia iusto sed saepe quidem numquam labore, sint
            dignissimos, distinctio esse laboriosam fugit repellat nam! Deserunt
            reprehenderit earum tenetur numquam facere. Nemo quia debitis harum
            maiores ex consectetur possimus.
          </h2>
        </div>
      </qh-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  RiWebhookFill,
  RiGithubFill,
  RiArticleFill,
  RiArticleLine,
  RiGlobalFill,
  RiGlobalLine,
  RiSchoolFill,
  RiGraduationCapFill,
  RiCalendarLine,
  RiCalendarFill,
  RiBookFill,
} from 'vue-remix-icons';
import QH_CONSTANTS from '~/constants';
import { useUserStore } from '~/store/user-store';

definePageMeta({
  layout: 'users',
  middleware: 'auth',
  name: QH_CONSTANTS.EDUCATION,
});

useHead({
  title: 'QuickHire - Projects',
});

const { formatDate, formatISODate } = useDate();

const { educations } = storeToRefs(useUserStore());
</script>

<style scoped>
.icon {
  @apply mr-3 fill-brand text-brand;
}
</style>
