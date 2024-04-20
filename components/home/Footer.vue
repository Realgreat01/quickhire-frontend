<template>
  <div>
    <h1 class="qh-text-2">Join Our NewsLetter</h1>
    <qh-input v-model="user_email" label="" name="email" />
  </div>

  <div
    class="mx-auto my-10 flex w-[90%] flex-col items-center justify-center md:w-2/3"
  >
    <h2
      class="mt-10 w-full border-[1px] border-transparent border-t-[#455A64] pt-5 text-center md:w-4/5 md:pt-10"
    >
      Dev Resume is a buiilt with love by
      <a href="https://www.github.com/Realgreat01" class="link">
        Samson Ikuomenisan</a
      >
      . You can follow up the author on
      <a href="https://www.twitter.com/srealgreat" class="link">Twitter</a>
      and also contribute to the page on
      <a href="" class="link">Github</a>
    </h2>

    <h2
      class="mt-5 w-4/5 border-[1px] border-transparent border-t-[#455A64] pt-5 text-center md:mt-10 md:w-3/5 md:pt-10"
    >
      Project is liecenced under
      <a href="" class="link">MIT</a>
      and released in <span class="link">2022</span>
    </h2>
  </div>
</template>

<script setup lang="ts">
const user_email = ref('');
</script>

<style lang="scss">
.link {
  @apply font-semibold text-brand;
}
</style>
