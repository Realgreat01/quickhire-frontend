<template>
  <div>
    <label class="switch">
      <input type="checkbox" :checked="modelValue" @change="toggleCheckbox" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>();

function toggleCheckbox(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #171717;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 6px;
  bottom: 6px;
  background-color: rgb(251, 171, 0);
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #023696;
}

/* input:focus + .slider {
  box-shadow: 0 0 1px #f9027e;
} */

input:checked + .slider:before {
  transform: translateX(50px);
}

.slider.round {
  border-radius: 50px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
