<template>
  <div
    class="scroll to-slate- from- 10% flex h-screen w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-600 via-slate-700 via-30% to-slate-900 to-90% text-white"
  >
    <!-- <img src="/signup_logo.png" class="my-10 h-40" alt="" /> -->
    <h1 class="text-8xl font-bold">
      {{ error.statusCode }}
      <span class="" v-if="error.statusCode === 404 || '404'"></span>
    </h1>

    <p class="font-base my-5 text-2xl">
      {{
        error.statusCode === 404 || '404' ? getRandomError : error.statusCode
      }}
    </p>

    <p class="flex gap-4">
      <nuxt-link
        to="/portfolio"
        class="rounded bg-gradient-to-br from-green-600 to-slate-900 px-4 py-2 text-white"
      >
        Back to Dashboard
      </nuxt-link>
    </p>
  </div>
</template>

<script setup>
const error = useError();
const errorMessage = 'Oops! Something Unexpected Happened !';
const customErrorMessages = ref([
  'Oops! You’ve discovered the mysterious 404 error!',
  'Oh no! This page seems to be on vacation ',
  'This page is playing hide and seek with you!',
  'This page has gone for a coffee break!',
  'Looks like a ninja stole this page! ',
  'This page is in another dimension.',
  'Whoopsie! This page seems to have vanished.',
  'This page is taking a day off!',
  'Page not found. Maybe it’s in the Bermuda Triangle!',
  'Yikes! It seems this page is having a party elsewhere .',
]);

const getRandomError = computed(() => {
  const max = customErrorMessages.value.length;
  const min = 0;

  const randomIndex = Math.floor(Math.random() * (max - min)) + min;
  const randomErrorMessage = customErrorMessages.value[randomIndex];
  return randomErrorMessage;
});
</script>
