import ApiService from './api-service.service';
import type {
  BasicDetails,
  Education,
  Experience,
  Projects,
  Skills,
} from '~/types/user';

export const GET_USER_DETAILS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/user',
  });
};

export const GET_USER_BY_USERNAME = async (username: string) => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/public/user/' + username,
  });
};

export const EDIT_USER_DETAILS = async (data: BasicDetails) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: '/user',
    data,
  });
};

export const GET_USER_EXPERIENCE = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/user/experience',
  });
};

export const ADD_USER_EXPERIENCE = async (data: Experience) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/user/experience',
    data,
  });
};
export const EDIT_USER_EXPERIENCE = async (data: Experience, id: string) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: '/user/experience/' + id,
    data,
  });
};
export const DELETE_USER_EXPERIENCE = async (id: string) => {
  return await ApiService.run({
    method: ApiService.DELETE,
    url: '/user/experience/' + id,
  });
};

export const GET_USER_EDUCATION = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/user/education',
  });
};

export const ADD_USER_EDUCATION = async (data: Education) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/user/education',
    data,
  });
};
export const EDIT_USER_EDUCATION = async (data: Education, id: string) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: '/user/education/' + id,
    data,
  });
};
export const DELETE_USER_EDUCATION = async (id: string) => {
  return await ApiService.run({
    method: ApiService.DELETE,
    url: '/user/education/' + id,
  });
};

export const GET_USER_PROJECTS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/user/project',
  });
};

export const ADD_USER_PROJECTS = async (data: Projects) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/user/project',
    data,
  });
};
export const EDIT_USER_PROJECTS = async (data: Projects, id: string) => {
  return await ApiService.run({
    method: ApiService.PUT,
    url: '/user/project/' + id,
    data,
  });
};
export const DELETE_USER_PROJECTS = async (id: string) => {
  return await ApiService.run({
    method: ApiService.DELETE,
    url: '/user/project/' + id,
  });
};
export const GET_USER_SKILLS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/user/skills/',
  });
};

export const UPDATE_USER_SKILLS = async (data: Skills) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/user/skills/',
    data,
  });
};

export default {};
