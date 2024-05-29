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

export const UPDATE_COVER_IMAGE = async (data: FormData) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: '/company/cover-image',
    data,
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
};
export const UPDATE_LOGO = async (data: FormData) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: '/company/logo',
    data,
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
};
