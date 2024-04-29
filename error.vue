<template>
  <div
    class="scroll to-slate- from- 10% flex h-screen w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-600 via-slate-700 via-30% to-slate-900 to-90% text-white"
  >
    <p class="flex gap-4">
      <router-link
        to="/user"
        class="rounded bg-gradient-to-br from-green-600 to-slate-900 px-4 py-2 text-white"
      >
        Back to Dashboard
      </router-link>
    </p>
  </div>
</template>

<script setup>
const error = useError();
</script>
