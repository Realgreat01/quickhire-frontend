import { defineStore } from 'pinia';

interface State {
  showModal: boolean;
  showDropdown: boolean;
  files: File[];
  resolve: any;
  reject: any;
}

export const useUploadStore = defineStore('upload', {
  state: (): State => ({
    showModal: false,
    showDropdown: false,
    files: [],
    resolve: null,
    reject: null,
  }),

  actions: {
    openModal() {
      this.showModal = true;
      return new Promise<boolean>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    closeModal() {
      this.uploadFiles(); // Trigger file upload when modal is closed
      this.showModal = false;
    },

    setFiles(files: File[]) {
      this.files = files;
    },

    async uploadFiles() {
      if (this.files.length > 0) {
        try {
          // Placeholder for your upload logic
          // const responses = await uploadToCloudinary(this.files);
          // this.files = []; // Clear files after upload
          // this.resolve(true);
          console.log('Uploading files...', this.files);
        } catch (error) {
          console.error('Error uploading files:', error);
          this.reject(error);
        }
      }
      this.closeModal();
    },

    cancel() {
      if (this.reject) {
        this.reject('Upload cancelled');
      }
      this.$reset();
      this.closeModal();
    },

    closeDropdown() {
      this.showDropdown = false;
      this.$reset();
    },
  },

  persist: false,
});
