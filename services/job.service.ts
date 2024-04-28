import ApiService from './api-service.service';
import type { BasicDetails } from '~/types';



export const ADD_USER_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/forms/basic-details',
    data,
  });
};
