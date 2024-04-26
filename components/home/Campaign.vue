<template>
  <div class="my-5 grid grid-flow-dense gap-8 md:my-20 md:grid-cols-2">
    <div class="mx-auto w-[96%]">
      <h2 class="qh-text-1 mb-4 text-center font-bold md:mb-10">
        Watch A Video About Us
      </h2>
      <h2 class="qh-text-4">
        QuickHire is a career discovery platform and we reduce time to hire by
        40% and talent stays 3x longer than the industry average.
        <br />
        <br />
        We partner with job seekers to find career fulfillment by finding the
        right job and advancement opportunities. This unique approach helps us
        provide a better engaged and aligned talent pool for employers and
        operators.
      </h2>
    </div>
    <div class="mx-auto">
      <iframe
        class="h-40 w-[90vw] md:h-[350px] md:w-[500px]"
        src="https://www.youtube.com/embed/pL1y-qGHvTw?si=xgHdWNyyetNlc4vO"
        title="QuickHire "
        frameborder="10"
        allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ Class: String });
</script>

<style scoped></style>
