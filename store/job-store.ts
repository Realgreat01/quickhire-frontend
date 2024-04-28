import { GET_ALL_JOBS, GET_SINGLE_JOB } from '~/services/job.service';
import type { Job } from '~/types/job';
interface JobType {
  Job: Job | null;
  AllJobs: Job[] | null;
  Jobs: Job[] | null;
  Applied_Jobs: Job | null;
}

export const useJobStore = defineStore('job', {
  state: (): JobType => {
    return {
      Job: null,
      AllJobs: [],
      Jobs: [],
      Applied_Jobs: null,
    };
  },

  getters: {
    allJobs(): Job[] | any {
      return this.AllJobs;
    },
    job(): Job | any {
      return this.Job;
    },

    otherJobs() {
      return this.allJobs.filter((job: any) => job._id != this.job._id);
    },
  },

  actions: {
    async getAllJobs() {
      const res = await GET_ALL_JOBS();
      if (res.success) {
        this.AllJobs = res.data;
        this.Jobs = res.data;
      }
    },

    async getSingleJob(id: string) {
      const res = await GET_SINGLE_JOB(id);
      if (res.success) {
        this.Job = res.data;
      } else qhToast.error('Unable to get Job');
    },
  },
  persist: true,
});
