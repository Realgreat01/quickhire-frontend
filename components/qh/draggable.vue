<template>
  <div>
    <VueDraggable
      ref="draggable"
      v-model="model"
      :animation="300"
      ghostClass="ghost"
      class="w-300px h-300px m-auto flex flex-col gap-2 rounded bg-gray-500/5 p-4"
      v-bind="$attrs"
    >
      <slot></slot>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<any[] | any>({ default: [] });
const emit = defineEmits(['dragStart', 'dragUpdated']);
const draggable = ref();
const dragStart = () => {
  emit('dragStart');
};
const dragUpdated = () => emit('dragUpdated');
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
