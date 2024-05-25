<template>
  <qh-container @close="emits('cancelled', 'close')">
    <div
      ref="dropZone"
      @click.self.stop.prevent="open()"
      :class="{ 'bg-brand-200 bg-opacity-50': isOverDropZone }"
      class="qh-flex-center relative mt-8 min-h-80 w-full flex-col border-2 border-dotted border-brand p-6"
    >
      <RiUploadCloud2Fill class="mx-auto mt-5 h-20 w-60 fill-brand" />
      <div class="qh-flex-center z-10 flex-col gap-5 text-center">
        <div
          class="qh-text-3 font-lora my-5 justify-self-end font-medium text-brand"
        >
          <h1 v-if="isOverDropZone" class="">Drag File Here</h1>
          <h2 v-else class="">Drag 'n' drop some files here</h2>
        </div>
        <div class="qh-text-4 font-bold text-brand">
          <div class="flex flex-wrap gap-2">
            <h2 class="my-1" v-for="file in files">
              <img
                v-if="file.type.startsWith('image')"
                :src="getImageURL(file)"
                alt=""
                class="mx-auto block h-16 rounded-lg bg-brand-100 object-cover"
              />
            </h2>
          </div>
        </div>

        <h2 class="text-error" v-if="maxFileExceeded">
          You can only upload a maximum of 1MB file
        </h2>
        <div class="flex gap-6">
          <qh-button
            @click="open"
            class="qh-text-4 my-4 h-10 w-32 rounded-full !bg-brand-100 !py-3 font-semibold !text-brand md:w-60"
            >Choose Files
          </qh-button>
          <qh-button
            :loading="uploading"
            :disabled="files.length < 1 || maxFileExceeded"
            class="qh-text-4 my-4 h-10 w-32 rounded-full !py-3 font-semibold md:my-4 md:w-60"
            @click="emits('upload')"
            >Upload
          </qh-button>
        </div>
      </div>
    </div>
  </qh-container>
</template>

<script setup lang="ts">
import { RiUploadCloud2Fill } from 'vue-remix-icons';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { useUploadStore } from '~/store/upload-store';

const emits = defineEmits(['upload', 'close', 'cancelled']);

const { files, uploading } = storeToRefs(useUploadStore());

const dropZone = ref<HTMLElement>();
const maxFileExceeded = ref(false);
const { open, reset, onChange } = useFileDialog({
  accept: 'image/*',
});

const maxFileSize = 1024 * 1024;

const getImageURL = (image: File) => URL.createObjectURL(image);

function onDrop(filesData: File[] | null) {
  maxFileExceeded.value = false;
  files.value = [];

  if (filesData) {
    const validFiles = filesData.every((file) => file.size <= maxFileSize);
    if (validFiles) {
      files.value = filesData.map((file) => file);
    } else maxFileExceeded.value = true;
  }
}

onChange((filesData) => {
  maxFileExceeded.value = false;
  if (filesData) {
    const validFiles = [...filesData].every((file) => file.size <= maxFileSize);
    if (validFiles) {
      files.value = [...filesData].map((file) => file);
    } else maxFileExceeded.value = true;
  }
});

const { isOverDropZone } = useDropZone(dropZone, {
  onDrop,
  dataTypes: ['image/jpeg', 'image/jpg', 'image/png'],
});
</script>
