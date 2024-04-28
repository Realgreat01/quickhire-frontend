import ApiService from './api-service.service';
import type { BasicDetails } from '~/types';

export const GET_CURRENT_COMPANY = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/company',
  });
};

export const CREATE_NEW_JOB = async (data: any) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/company/job',
    data,
  });
};
