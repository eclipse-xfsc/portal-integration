import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import Error from '../error/Error';
import useUserContext from './useUserContext';

const useApi = <T>(handleError?: (error: Error) => void) => {
  const [fetchResult, setFetchResult] = useState<T>();
  const getUserContext = useUserContext();

  const fetchData = useCallback(
    async (config: AxiosRequestConfig, transformData?: (data: any) => T, onSuccess?: () => void) => {
      try {
        const response = await getAxiosInstance().request(config);
        if (response.data) {
          let data = response.data;
          if (transformData) data = transformData(response.data);

          setFetchResult(data);
        }
      } catch (error) {
        console.log(error);

        handleError && handleError(error as Error);
      }
    },
    [handleError]
  );

  const sendData = useCallback(
    async (config: AxiosRequestConfig, onSuccess?: () => void) => {
      try {
        await getAxiosInstance().request(config);
        onSuccess && onSuccess();
      } catch (error) {
        console.log(error);

        handleError && handleError(error as Error);
      }
    },
    [handleError]
  );

  const getAxiosInstance = () => {
    const axiosInstance = axios.create({ baseURL: '/api' });
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = getUserContext()?.access_token;
        if (token && config?.headers) {
          // @ts-ignore
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        if (config?.headers) {
          // @ts-ignore
          config.headers['Content-Type'] = 'application/json';
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    return axiosInstance;
  };

  return [fetchResult, { fetchData, sendData, setFetchResult }] as const;
};

export default useApi;
