import ApiService from './api-service.service';
import type { BasicDetails } from '~/types';

export const GET_CURRENT_COMPANY = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/company',
  });
};
export const ADD_USER_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/forms/basic-details',
    data,
  });
};
