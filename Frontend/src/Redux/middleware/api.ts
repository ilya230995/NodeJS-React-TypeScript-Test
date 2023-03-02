import axios, { AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

const ApiService = {
  apiCall: <T>({
    baseURL = API_CONFIG.BASE_URL,
    endpoint = '',
    method = 'GET',
    query = {},
    headers = null,
    qsParams = {},
  }: {
    baseURL?: string;
    endpoint: string;
    method: string;
    query?: any;
    withCredentials?: boolean;
    transformRequest?: any;
    headers?: { [key: string]: string } | null;
    qsParams?: { [key: string]: string };
  }): Promise<AxiosResponse<T>> => {
    try {
      const api = axios.create({
        baseURL,
        headers: headers || {},
        params: qsParams || {},
      });

      switch (method) {
        case 'GET':
          return api.get(endpoint, query);
        case 'POST':
          return api.post(endpoint, query);
        case 'PUT':
          return api.put(endpoint, query);
        case 'DELETE':
          return api.delete(endpoint, query);
        default:
          return api.get(endpoint, query);
      }
    } catch (e) {
      throw e;
    }
  },
};
export default ApiService;
