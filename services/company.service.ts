import type { Company } from '~/types/company';
import ApiService from './api-service.service';

export const GET_CURRENT_COMPANY = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/company',
  });
};
export const GET_COMPANY = async (id: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/company',
  });
};
export const GET_ALL_COMPANY = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/company/companies/all',
  });
};
export const UPDATE_COMPANY_DETAILS = async (data: Company | any) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: '/company',
    data,
  });
};
