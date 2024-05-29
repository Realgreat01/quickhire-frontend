import ApiService from './api-service.service';
import axios from 'axios';

export const CONVERT_IMAGE_TO_BASE64 = async (data: { image_url: string }) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/utils/base64-image',
    data,
  });
};

export const SUBSCRIBE_TO_EMAIL = async (data: {
  firstname: string;
  lastname: string;
  email: string;
}) => {
  return await ApiService.run({
    method: ApiService.POST,
    url: '/utils/email-subscriber',
    data,
  });
};

export const GET_OPERATIONAL_INSIGHTS = async () => {
  return await ApiService.run({
    method: ApiService.GET,
    url: '/utils/insights',
  });
};

export const GET_ALL_COUNTRIES = async () => {
  return await axios({
    method: ApiService.GET,
    baseURL: ENV.X_CSCAPI_API_URL,
    url: '/countries',
    headers: {
      'X-CSCAPI-KEY': ENV.X_CSCAPI_API_KEY,
    },
  });
};

export const GET_STATES_BY_COUNTRY = async (id: string) => {
  return await axios({
    method: ApiService.GET,
    baseURL: ENV.X_CSCAPI_API_URL,
    url: `countries/${id}/states`,
    headers: {
      'X-CSCAPI-KEY': ENV.X_CSCAPI_API_KEY,
    },
  });
};

export const GET_CITIES_BY_STATE_AND_COUNTRY = async (
  countryId: string,
  stateId: string,
) => {
  return await axios({
    method: ApiService.GET,
    baseURL: ENV.X_CSCAPI_API_URL,
    url: `countries/${countryId}/states/${stateId}/cities`,
    headers: {
      'X-CSCAPI-KEY': ENV.X_CSCAPI_API_KEY,
    },
  });
};
