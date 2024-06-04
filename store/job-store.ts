import {
  APPLY_FOR_JOB,
  GET_ALL_JOBS,
  GET_SINGLE_JOB,
  GET_APPLIED_JOB,
  GET_COMPANY_JOBS,
  GET_JOB_APPLICANTS,
  GET_JOB_APPLICANT,
  GET_SIMILAR_JOB,
  GET_MATCHED_JOBS,
  UPDATE_JOB_APPLICANTS_STATUS,
  GET_JOB_RECOMMENDATIONS,
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
  SimilarJobs: Job[] | null;
  JobRecommendations: Job[] | null;
  Applied_Jobs: AppliedJob[] | null;
  CompanyJobs: Job[];
  JobApplicants: { user: User[] } | null;
  JobApplicant: User | null;
  searchQuery: {
    title: string;
    type: string;
    location: string;
    level: string;
  };
}

export const useJobStore = defineStore('job', {
  state: (): JobType => {
    return {
      Job: null,
      AllJobs: [],
      SimilarJobs: [],
      JobRecommendations: [],
      Applied_Jobs: [],
      CompanyJobs: [],
      JobApplicants: null,
      JobApplicant: null,

      searchQuery: {
        title: '',
        type: '',
        location: '',
        level: '',
      },
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

    similarJobs(): Job[] | null {
      return this.SimilarJobs;
    },

    jobRecommendations(): Job[] | null {
      return this.JobRecommendations;
    },

    appliedJobs(): AppliedJob[] | null {
      return this.Applied_Jobs;
    },

    jobApplicants(): User[] | any {
      return this.JobApplicants;
    },

    jobApplicant(): User | any {
      return this.JobApplicant;
    },
  },

  actions: {
    async getAllJobs() {
      const res = await GET_ALL_JOBS();
      if (res.success) {
        this.AllJobs = res.data;
      }
    },

    async getMatchedJobs() {
      const res = await GET_MATCHED_JOBS(this.searchQuery);
      if (res.success) {
        this.AllJobs = res.data;
      }
    },
    async getJobRecommendations() {
      const res = await GET_JOB_RECOMMENDATIONS();
      if (res.success) {
        this.JobRecommendations = res.data;
      }
    },

    async getSingleJob(id: string) {
      const res = await GET_SINGLE_JOB(id);
      if (res.success) {
        this.Job = res.data;
        this.SimilarJobs = (await GET_SIMILAR_JOB(id)).data;
      } else qhToast.error('Unable to get Job');
    },

    async getJobApplicants(id: string) {
      const res = await GET_JOB_APPLICANTS(id);
      if (res.success) {
        this.JobApplicants = res.data;
      } else qhToast.error('Unable to get Job applicants');
    },

    async getJobApplicant(jobId: string, applicantId: string) {
      const res = await GET_JOB_APPLICANT(jobId, applicantId);
      if (res.success) {
        this.JobApplicant = res.data;
      } else qhToast.error('Unable to get Job applicants');
    },

    async updateJobApplicant(data: any, jobId: string, applicantId: string) {
      const res = await UPDATE_JOB_APPLICANTS_STATUS(data, jobId, applicantId);
      if (res.success) {
        qhToast.success("updated applicant's status successfully");
        await this.getJobApplicant(jobId, applicantId);
      } else qhToast.error("Unable to update applicant's status");
    },

    async getApplyForJob(id: string) {
      const res = await APPLY_FOR_JOB(id);
      if (res.success) {
        qhToast.success('Successfully applied for job');
        await this.getAllJobs();
        await this.getSingleJob(id);
        await this.getAppliedJobs();
        await this.getJobRecommendations();
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
