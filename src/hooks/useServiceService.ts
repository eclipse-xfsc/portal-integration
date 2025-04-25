import { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';
import Error from '../error/Error';
import useApi from './useApi';

const config: AxiosRequestConfig = {
  method: 'GET',
  url: '/service/',
  headers: { 'Content-Type': 'application/json' },
};

const useServiceService = <T>(handleError?: (error: Error) => void) => {
  const [result, { fetchData, sendData }] = useApi<T>(handleError);

  const load = useCallback(() => {
    fetchData({ ...config, url: `${config.url}` });
  }, [fetchData]);

  return [result, { load }] as const;
};

export default useServiceService;
