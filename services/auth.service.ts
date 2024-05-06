import type {
  LOGIN_COMPANY_PAYLOAD,
  REGISTER_COMPANY_PAYLOAD,
} from '~/types/auth';
import ApiService from './api-service.service';
import type { LOGIN_PAYlOAD } from '~/types/auth';

export const LOG_IN_USER = async (data: LOGIN_PAYlOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/login',
    data,
  });
};

export const REGISTER_USER = async (data: LOGIN_PAYlOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/register',
    data,
  });
};

export const CHANGE_PASSWORD_USER = async (data: LOGIN_PAYlOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/users/login',
    data,
  });
};

export const FORGOT_PASSWORD_USER = async (data: LOGIN_PAYlOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/users/login',
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

export const CHANGE_PASSWORD_COMPANY = async (data: LOGIN_PAYlOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/users/login',
    data,
  });
};

export const FORGOT_PASSWORD_COMPANY = async (data: LOGIN_PAYlOAD) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/auth/users/login',
    data,
  });
};
