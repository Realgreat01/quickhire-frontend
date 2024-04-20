import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import QH_CONSTANTS from '~/constants';

interface IResponse {
  status: number | null;
  message: string;
  code: number | null;
  data: object;
  meta?: any;
}

class ApiResponse implements IResponse {
  status = null;
  success = false;
  message = '';
  code = null;
  data: any = {};
  meta = null;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

interface IRequest extends AxiosRequestConfig {}

export default class ApiService {
  public static GET = 'get';
  public static POST = 'post';
  public static PATCH = 'patch';
  public static PUT = 'put';
  public static DELETE = 'delete';

  private static http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Initialize interceptors statically
  static initializeInterceptors() {
    ApiService.http.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(QH_CONSTANTS.AUTH_TOKEN);
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  // Static token setter
  public static setToken(token: string) {
    localStorage.setItem(QH_CONSTANTS.AUTH_TOKEN, token);
  }

  static getErrorMessage(errors = []) {
    const { name, message } = errors?.[0] ?? {};
    if (name && message) return `${name} ${message}`;
    return null;
  }

  // Static run method
  public static async run(request: IRequest) {
    let response;
    try {
      const serverResponse = await ApiService.http(request);

      response = new ApiResponse({
        status: serverResponse.status,
        code: serverResponse.data.code,
        success: true,
        message: serverResponse.data.message,
        data: serverResponse.data.data || serverResponse.data,
        meta: serverResponse.data.meta,
      });
    } catch (err: AxiosError | any) {
      if (!err.response) {
        // Network Error
        response = new ApiResponse({
          message:
            err?.message === 'Network Error'
              ? 'Oops! Check internet connection'
              : err.message,
          status: -1,
        });

        // Valid server error or others
      } else if (err.response.data) {
        response = new ApiResponse({
          code: err.response.data.code,
          message:
            ApiService.getErrorMessage(err.response.data?.data) ||
            err.response.data.message ||
            'Oops! An unknown error ocurred. Please try again.',
          status: err.response.status,
        });

        // No internet
      } else {
        response = new ApiResponse({
          message: 'Oops! Check internet connection' || err.message,
          status: -1,
        });
      }
    }
    return response;
  }
}

ApiService.initializeInterceptors();
