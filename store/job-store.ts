import type { Job } from '~/types';
interface JobType {
  job: Job | null;
  applied_jobs: Job | null;
}

export const useUserStore = defineStore('job', {
  state: (): JobType => {
    return {
      job: null,
      applied_jobs: null,
    };
  },
  getters: {},
  actions: {},
  persist: true,
});
