import {
  APPLY_FOR_JOB,
  GET_ALL_JOBS,
  GET_SINGLE_JOB,
} from '~/services/job.service';
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

    otherJobs(): Job[] | null {
      if (this.AllJobs) {
        return this.AllJobs.filter((job: any) => job._id != this.job._id);
      } else return [];
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

    async getApplyForJob(id: string) {
      const res = await APPLY_FOR_JOB(id);
      if (res.success) {
        qhToast.success('Successfully applied for job');
        await this.getAllJobs();
        await this.getSingleJob(id);
      } else qhToast.error('Error applying for job');
    },
  },
  persist: true,
});
