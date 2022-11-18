import { defineStore } from 'pinia';

export const useCounterStore = defineStore('common', {
  state: () => ({
    notify: false,
  }),
  getters: {},
  actions: {
    showNotify() {
      this.notify = true;
    },
    hideNotify() {
      this.notify = false;
    },
  },
});
