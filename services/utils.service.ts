import ApiService from './api-service.service';

export const GET_ALL_JOBS = async (data: any) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '',
    data,
  });
};
