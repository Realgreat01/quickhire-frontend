<template>
  <div class="my-20 grid grid-flow-dense gap-8 md:grid-cols-2">
    <div class="w-4/5">
      <h2 class="qh-text-2 mb-10 font-bold">Watch A Video About Us</h2>
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
    <div class="">
      <iframe
        class="h-40 w-fit md:h-[350px] md:w-[400px]"
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
