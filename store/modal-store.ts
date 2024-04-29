import { defineStore } from 'pinia';
interface State {
  showModal: boolean;
  showDropdown: boolean;
  message: string;
  title: string;
  resolve: any;
  reject: any;
}
interface modalOptions {
  message?: string;
  title?: string;
}
const defaultMessage = `
Do you really want to proceed with this action.

<br>

 Action may be irreversible!`;
const defaultTitle = 'Are you sure ?!';

export const useModalStore = defineStore('modal', {
  state: (): State => ({
    showModal: false,
    showDropdown: false,
    message: defaultMessage,
    title: defaultTitle,
    resolve: null,
    reject: null,
  }),

  getters: {},

  actions: {
    async openModal(option?: modalOptions) {
      if (option?.title) {
        this.title = option?.title;
      } else this.title = defaultTitle;

      if (option?.message) {
        this.message = option.message;
      } else this.message = defaultMessage;

      this.showModal = true;
      return new Promise<boolean>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    closeModal() {
      this.showModal = false;
    },

    continue() {
      if (this.resolve) {
        this.resolve(true);
      }
      this.closeModal();
    },

    cancel() {
      if (this.reject) {
        this.reject(false);
      }
      this.closeModal();
    },

    closeDropdown() {
      this.showDropdown = false;
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
});
