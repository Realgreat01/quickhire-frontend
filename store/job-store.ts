import {
  APPLY_FOR_JOB,
  GET_ALL_JOBS,
  GET_SINGLE_JOB,
  GET_APPLIED_JOB,
  GET_COMPANY_JOBS,
  GET_JOB_APPLICANTS,
  GET_JOB_APPLICANT,
} from '~/services/job.service';
import type { Job } from '~/types/job';
import type { User } from '~/types/user';

interface AppliedJob extends Job {
  applicant_count: number;
  candidate: {
    user: string;
    status: 'submitted' | 'received' | 'processing' | 'accepted' | 'rejected';
    interview_dates: Date[];
    interview_feedback: any[];
  };
}
interface JobType {
  Job: Job | null;
  AllJobs: Job[] | null;
  Jobs: Job[] | null;
  Applied_Jobs: AppliedJob[] | null;
  CompanyJobs: Job[];
  JobApplicants: { user: User[] } | null;
  JobApplicant: User | null;
}

export const useJobStore = defineStore('job', {
  state: (): JobType => {
    return {
      Job: null,
      AllJobs: [],
      Jobs: [],
      Applied_Jobs: [],
      CompanyJobs: [],
      JobApplicants: null,
      JobApplicant: null,
    };
  },

  getters: {
    allJobs(): Job[] | any {
      return this.AllJobs;
    },
    companyJobs(): Job[] | any {
      return this.CompanyJobs;
    },

    job(): Job | any {
      return this.Job;
    },

    jobApplicants(): User[] | any {
      return this.JobApplicants;
    },

    jobApplicant(): User | any {
      return this.JobApplicant;
    },

    otherJobs(): Job[] | null {
      if (this.AllJobs) {
        return this.AllJobs.filter((job: any) => job._id != this.job._id);
      } else return [];
    },

    appliedJobs(): AppliedJob[] | null {
      return this.Applied_Jobs;
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

    async getJobApplicant(jobId: string, applicantId: string) {
      const res = await GET_JOB_APPLICANT(jobId, applicantId);
      if (res.success) {
        this.JobApplicant = res.data;
      } else qhToast.error('Unable to get Job applicants');
    },
    async getJobApplicants(id: string) {
      const res = await GET_JOB_APPLICANTS(id);
      if (res.success) {
        this.JobApplicants = res.data;
      } else qhToast.error('Unable to get Job applicants');
    },

    async getApplyForJob(id: string) {
      const res = await APPLY_FOR_JOB(id);
      if (res.success) {
        qhToast.success('Successfully applied for job');
        await this.getAllJobs();
        await this.getSingleJob(id);
        await this.getAppliedJobs();
      } else qhToast.error('Error applying for job');
    },

    async getAppliedJobs() {
      const res = await GET_APPLIED_JOB();
      if (res.success) {
        this.Applied_Jobs = res.data;
      }
    },
    async getCompanyJobs() {
      const res = await GET_COMPANY_JOBS();
      if (res.success) {
        this.CompanyJobs = res.data;
      }
    },
  },
  persist: true,
});
