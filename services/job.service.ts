import ApiService from './api-service.service';

export const CREATE_NEW_JOB = async (data: any) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/company/job',
    data,
  });
};

export const GET_COMPANY_JOBS = async (data: any) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/company/job',
    data,
  });
};

export const GET_COMPANY_SINGLE_JOB = async (data: any) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/company/job',
    data,
  });
};

export const UPDATE_JOB = async (data: any) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/company/job',
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

export const GET_ALL_JOBS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/job',
  });
};

export const GET_SINGLE_JOB = async (id: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/job/' + id,
  });
};

export const APPLY_FOR_JOB = async (id: string) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/job/apply/' + id,
  });
};

export const GET_JOB_STATUS = async (id: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/jobs/' + id,
  });
};
