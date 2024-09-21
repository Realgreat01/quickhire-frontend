<template>
  <div class="flex flex-col p-4 md:py-10 md:pl-10 md:pr-0" id="about">
    <qh-section-title>About</qh-section-title>

    <div class="grid items-start justify-start md:grid-cols-2">
      <p class="qh-text-4 w-full md:w-11/12" v-html="user?.about_me"></p>
      <div
        class="my-4 grid w-full grid-cols-4 flex-wrap items-start justify-start gap-1 overflow-x-hidden md:flex md:gap-4"
      >
        <button
          v-for="(skill, index) in skills"
          :key="index"
          class="qh-flex-center max-w-28 flex-col rounded-lg bg-dark-50 p-1 md:w-24 md:p-3"
        >
          <qh-devicon :icon="skill" hide-tooltip show-icon-name />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
const skills = computed(() => {
  const userSkills = user.value?.skills?.programming_languages
    .concat(user.value?.skills?.frameworks)
    .concat(user.value?.skills?.technologies);

  return qhHelpers.removeDuplicates(userSkills);
});
</script>

<style scoped></style>
