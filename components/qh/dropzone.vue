<template>
  <qh-container>
    <div
      ref="dropZone"
      class="qh-flex-center relative mt-8 min-h-80 w-full flex-col border-2 border-dotted border-brand p-6"
    >
      <RiUploadCloud2Fill class="mx-auto mt-5 h-20 w-60 fill-brand" />
      <div class="qh-flex-center z-10 flex-col gap-5 text-center">
        <div class="flex flex-wrap items-center justify-center">
          <div
            v-for="(file, index) in filesData"
            :key="index"
            class="w-200px bg-black-200/10 ma-2 pa-6"
          >
            <p>Name: {{ file.name }}</p>
            <p>Size: {{ file.size }}</p>
            <p>Type: {{ file.type }}</p>
            <p>Last modified: {{ file.lastModified }}</p>
          </div>
        </div>
        <div>
          <h1
            v-if="isOverDropZone"
            class="qh-text-3 font-lora justify-self-end font-medium text-brand"
          >
            Drag File Here
          </h1>

          <h2
            v-else
            class="qh-text-3 font-lora justify-self-end font-medium text-brand"
          >
            Drag 'n' drop some files here
          </h2>
        </div>
        <template v-if="files">
          <p>
            You have selected:
            <b>{{
              `${files.length} ${files.length === 1 ? 'file' : 'files'}`
            }}</b>
          </p>
          <li v-for="file of files" :key="file.name">
            {{ file.name }}
          </li>
        </template>
        <qh-button @click="open" class="w-60 rounded-full"
          >Choose Files</qh-button
        >
      </div>
    </div>
  </qh-container>
</template>

<script setup lang="ts">
import { RiUploadCloud2Fill } from 'vue-remix-icons';
import { useDropZone, useEventListener, useFileDialog } from '@vueuse/core';

const dropZone = ref<HTMLElement>();

const filesData = ref<
  { name: string; size: number; type: string; lastModified: number }[]
>([]);

const { files, open, reset, onChange } = useFileDialog({ accept: 'image/*' });

function onDrop(files: File[] | null) {
  filesData.value = [];
  if (files) {
    filesData.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
  }
}

const { isOverDropZone } = useDropZone(dropZone, onDrop);
</script>
