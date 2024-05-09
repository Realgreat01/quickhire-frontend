<template>
  <div>
    <!-- Trigger Button for Opening Modal -->
    <button @click="openModal">Upload Files</button>

    <!-- Modal for File Upload -->
    <div v-if="showModal" class="modal">
      <h2>Upload Files</h2>
      <input type="file" multiple @change="handleFileChange" />

      <!-- Actions -->
      <button @click="uploadFiles">Upload</button>
      <button @click="cancelUpload">Cancel</button>
    </div>

    <!-- Dropdown, for demonstration -->
    <div v-if="showDropdown">
      <p>Dropdown content here...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUploadStore } from '~/store/upload-store'; // Adjust the path as necessary

const { openModal, setFiles, uploadFiles, cancel, closeDropdown } =
  useUploadStore();
const { showModal, showDropdown } = storeToRefs(useUploadStore());
// Handle file input changes
function handleFileChange(event: any) {
  const files: File[] = Array.from(event.target.files);
  setFiles(files);
}

// Cancel the upload process
function cancelUpload() {
  cancel();
}
</script>

<style scoped>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
}
</style>
