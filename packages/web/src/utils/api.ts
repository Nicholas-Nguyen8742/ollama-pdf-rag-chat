import axios, { AxiosRequestConfig } from 'axios';
import { config } from './config';

export function getHeaders(): AxiosRequestConfig['headers'] {
  return {
    Accept: 'application/json',
  };
}

const instance = axios.create({
  baseURL: config.API_URL,
  timeout: 100000000
});

const api = async function(
    endpoint: string,
    data: AxiosRequestConfig['data'],
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    headers: AxiosRequestConfig['headers'],
    requestOptions = {}
) {
    return new Promise(async (res, rej) => {
      const getTokenHeader = getHeaders();
      headers = {
        ...getTokenHeader,
        ...headers
      };

      if (method === 'GET' || method === 'DELETE') {
        data = {
          ...requestOptions,
          ...data,
          headers
        };
      }

      instance.request({
        method,
        url: endpoint,
        data,
        headers,
      })
      .then((result: { data: any; }) => {
        const { data } = result;

        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch((error: { response: { data: { message: any; }; }; }) => {
        console.log(error)
        if (error && error.response && error.response.data) {
          if (!error.response.data.message) {
            return rej(error.response.data.message || 'Network Error')
          }
          return rej(error.response.data)
        } else {
          return rej('Network Error');
        }
      });
    });
}

api.post = function(
  endpoint: string,
  data?: AxiosRequestConfig['data'],
  headers: AxiosRequestConfig['headers'] = {}
) {
  return api(endpoint, data, 'POST', headers);
}

api.delete = function(
  endpoint: string,
  data: AxiosRequestConfig['data'],
  headers: AxiosRequestConfig['headers'] = {}
) {
  return api(endpoint, data, 'DELETE', headers);
}

api.get = function(
  endpoint: string,
  data?: AxiosRequestConfig['data'],
  headers: AxiosRequestConfig['headers'] = {},
  requestOptions = {}
) {
  return api(endpoint, data, 'GET', headers, requestOptions);
}

api.put = function(
  endpoint: string,
  data: AxiosRequestConfig['data'],
  headers: AxiosRequestConfig['headers'] = {}
) {
  return api(endpoint, data, 'PUT', headers);
}

export default api;

export {
  api
};
