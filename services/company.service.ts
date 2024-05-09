import ApiService from './api-service.service';

export const GET_CURRENT_COMPANY = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/company',
  });
};
