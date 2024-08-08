<template>
  <label
    class="switch mx-2 hidden h-14 items-center justify-between rounded-full"
  >
    <input type="checkbox" v-model="lightMode" @change="toggleCheckbox" />
    <span class="slider round relative flex items-center justify-between">
      <RiSunFill class="icon sun-icon" :class="{ 'light-mode': lightMode }" />
      <RiMoonFill class="icon moon-icon" :class="{ 'dark-mode': !lightMode }" />
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RiSunFill, RiMoonFill } from 'vue-remix-icons';

const lightMode = ref(JSON.parse(localStorage.getItem('THEME') as string));

function toggleCheckbox() {
  document.body.classList.toggle('dark', !lightMode.value);
  localStorage.setItem('THEME', JSON.stringify(lightMode.value));
}
onMounted(() => {
  if (lightMode.value === null) {
    localStorage.setItem('THEME', JSON.stringify(false));
    lightMode.value = ref(JSON.parse(localStorage.getItem('THEME') as string));
  }
});
</script>

<style scoped>
.switch {
  position: relative;
  /* display: inline-block; */
  width: 100px;
  height: 40px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--brand);
  transition: 0.4s;
  border-radius: 40px;
  padding: 4px;
}

.icon {
  height: 34px;
  width: 34px;
  transition: 0.4s;
  opacity: 0.3;
  border-radius: 50%;
  padding: 6px;
  color: white;
}

.light-mode {
  opacity: 1;
  color: var(--white);
  /* border: 2px solid var(--white); */
  /* djust the color as needed */
}

.dark-mode {
  opacity: 1;
  color: var(--black);
  /* border: 2px solid var(--black); */
  /* Adjust the color as needed */
}

input:checked + .slider {
  /* background-color: #2196f3; */
}

input:checked + .slider:before {
  transform: translateX(66px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
