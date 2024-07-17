import type {
  LOGIN_COMPANY_PAYLOAD,
  REGISTER_COMPANY_PAYLOAD,
  REGISTER_USER_PAYLOAD,
  RESET_PASSWORD_PAYLOAD,
  LOGIN_PAYLOAD,
} from '~/types/auth';
import ApiService from './api-service.service';

export const LOG_IN_USER = async (data: LOGIN_PAYLOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/login',
    data,
  });
};

export const REGISTER_USER = async (data: REGISTER_USER_PAYLOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/register',
    data,
  });
};

export const FORGOT_PASSWORD_USER = async (data: { email: string }) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/forgot-password',
    data,
  });
};

export const RESET_PASSWORD_USER = async (data: RESET_PASSWORD_PAYLOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/reset-password',
    data,
  });
};

export const LOG_IN_COMPANY = async (data: LOGIN_COMPANY_PAYLOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'auth/login/company',
    data,
  });
};

export const REGISTER_COMPANY = async (data: REGISTER_COMPANY_PAYLOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'auth/register/company',
    data,
  });
};

export const RESET_PASSWORD_COMPANY = async (data: RESET_PASSWORD_PAYLOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/users/login',
    data,
  });
};

export const FORGOT_PASSWORD_COMPANY = async (data: { email: string }) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/users/login',
    data,
  });
};
