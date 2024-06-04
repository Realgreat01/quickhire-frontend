import ApiService from './api-service.service';

// COMBINED JOB ACTIONS
interface searchQuery {
  title: string;
  type: string;
  location: string;
  level: string;
}
export const GET_ALL_JOBS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/public/jobs/',
  });
};
export const GET_MATCHED_JOBS = async (query?: searchQuery) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/public/jobs/matched',
    params: query,
  });
};

export const GET_SINGLE_JOB = async (id: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/public/jobs/' + id,
  });
};

export const GET_SIMILAR_JOB = async (id: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/job/similar/' + id,
  });
};
export const GET_JOB_RECOMMENDATIONS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/job/user/recommendations',
  });
};

// COMPANY JOB ACTIONS

export const CREATE_NEW_JOB = async (data: any) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/job/company',
    data,
  });
};

export const GET_COMPANY_JOBS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/job/company',
  });
};

export const GET_JOB_APPLICANTS = async (jobId: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: `/job/company/${jobId}/applicants`,
  });
};

export const GET_JOB_APPLICANT = async (jobId: string, applicantId: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: `/job/company/${jobId}/applicants/${applicantId}`,
  });
};

export const UPDATE_JOB_APPLICANTS_STATUS = async (
  data: any,
  jobId: string,
  applicantId: string,
) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: `/job/company/${jobId}/applicants/${applicantId}`,
    data,
  });
};

export const UPDATE_JOB = async (data: any) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: '/job/company',
    data,
  });
};

export const DELETE_JOB = async (data: any) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/company/job',
    data,
  });
};

// USER JOB ACTIONS
export const APPLY_FOR_JOB = async (id: string) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/job/user/apply/' + id,
  });
};

export const GET_APPLIED_JOB = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/job/user/applied',
  });
};

export const GET_JOB_STATUS = async (id: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/job/status/id' + id,
  });
};
