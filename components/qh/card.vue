<template>
  <div
    class="card rounded-lg border p-4"
    :class="{ Class, 'skeleton  bg-grays-100': loading }"
    v-bind="$attrs"
  >
    <slot v-if="!loading"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({ Class: String, loading: { type: Boolean, default: false } });
</script>

<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  min-height: 250px;
  animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
  0% {
    background-color: #efeeee;
  }
  50% {
    background-color: #e8e8e8;
  }
  100% {
    background-color: #efeeee;
  }
}

.skeleton::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    to right,
    transparent 0%,
    #f7f1f1 50%,
    transparent 100%
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -150px;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
