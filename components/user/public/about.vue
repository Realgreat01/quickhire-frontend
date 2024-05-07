<template>
  <div class="flex flex-col md:mt-[10rem]" id="about">
    <qh-section-title>About</qh-section-title>
    <p class="qh-text-4 w-full md:w-11/12">
      Hey there! 👋🏾 I'm Samson Ikuomenisan, a passionate Fullstack Developer
      with a solid background in web development. I thrive on crafting
      exceptional digital experiences and leveraging cutting-edge technologies
      to build innovative solutions. Simultaneously, I'm pursuing a degree in
      Dentistry and Dental Surgery, blending my technical expertise with medical
      knowledge to approach problem-solving with a multidisciplinary mindset.
      <br />
      <br />
      Beyond coding and dentistry, I find immense joy in engaging in meaningful
      conversations, connecting with people from diverse backgrounds, and
      expanding my horizons through literature. By embracing a well-rounded set
      of interests, including my love for reading, fostering human connections,
      and advocating for positive change, I bring a diverse perspective and a
      deep understanding to my work. I'm thrilled to collaborate on impactful
      projects that utilize technology to make a tangible difference in people's
      lives.
      <br />
      <br />
      Let's join forces and create something truly amazing together!
    </p>
  </div>
  <div class="grid items-start justify-start pt-10 md:grid-cols-2">
    <div class="flex h-full w-full items-start justify-start">
      <img
        :src="user?.profile_picture"
        alt=""
        class="mx-auto my-auto block h-60"
      />
    </div>
    <div class="my-4 grid w-full grid-cols-4 flex-wrap gap-4 md:flex">
      <button
        v-for="(skill, index) in skills"
        :key="index"
        class="flex] w-20 flex-col items-center justify-center gap-4 rounded-lg bg-white p-2"
      >
        <qh-devicon ref="skillIcons" :icon="skill" />
        <!-- <p class="qh-text-4">{{ skill.name }}</p> -->
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user-store';
const { publicUser: user } = storeToRefs(useUserStore());
const skills = computed(() =>
  user.value?.skills.frameworks.concat(user.value.skills.programming_languages),
);
</script>

<style scoped></style>
