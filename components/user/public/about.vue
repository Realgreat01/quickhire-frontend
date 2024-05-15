<template>
  <div class="flex flex-col p-10" id="about">
    <qh-section-title>About</qh-section-title>

    <div class="grid items-start justify-start pt-10 md:grid-cols-2">
      <p class="qh-text-4 w-full md:w-11/12" v-html="user?.about_me"></p>
      <div class="my-4 grid w-full grid-cols-4 flex-wrap gap-4 md:flex">
        <button
          v-for="(skill, index) in skills"
          :key="index"
          class="flex] w-28 flex-col items-center justify-center gap-4 rounded-lg bg-white p-2"
        >
          <qh-devicon ref="skillIcons" :icon="skill" />
          <p class="qh-text-4">{{ skill.name }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
const skills = computed(() => {
  const userSkills = user.value?.skills?.top_skills
    .concat(user.value?.skills?.programming_languages)
    .concat(user.value?.skills?.frameworks)
    .concat(user.value?.skills?.technologies);

  return qhHelpers.removeDuplicates(userSkills);
});
</script>

<style scoped></style>
