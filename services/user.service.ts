import ApiService from './api-service.service';
import type {
  BasicDetails,
  Education,
  Experience,
  Projects,
  Stacks,
} from '~/types';

export const GET_USER_DETAILS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/forms/basic-details',
  });
};
export const ADD_USER_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};

export const EDIT_USER_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const DELETE_USER_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const ADD_BIO_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const EDIT_BIO_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const DELETE_BIO_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};

export const GET_USER_EXPERIENCE = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: 'forms/experience',
  });
};

export const ADD_USER_EXPERIENCE = async (data: Experience) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const EDIT_USER_EXPERIENCE = async (data: Experience, id: string) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const DELETE_USER_EXPERIENCE = async (data: Experience, id: string) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};

export const GET_USER_EDUCATION = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: 'forms/education',
  });
};

export const ADD_USER_EDUCATION = async (data: Education) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const EDIT_USER_EDUCATION = async (data: Education, id: string) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const DELETE_USER_EDUCATION = async (data: Education, id: string) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};

export const ADD_USER_STACK = async (data: Stacks) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const EDIT_USER_STACK = async (data: Stacks) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};
export const DELETE_USER_STACK = async (data: Stacks) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'api/auth/users/login',
    data,
  });
};

export const GET_USER_PROJECTS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: 'forms/projects',
  });
};

export const ADD_USER_PROJECTS = async (data: Projects) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'forms/projects',
    data,
  });
};
export const EDIT_USER_PROJECTS = async (data: Projects, id: string) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'forms/projects/' + id,
    data,
  });
};
export const DELETE_USER_PROJECTS = async (data: Projects, id: string) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: 'forms/projects' + id,
    data,
  });
};
