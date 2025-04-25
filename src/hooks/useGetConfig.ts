import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import Config from '../config/Config';
import Error from '../error/Error';
import useApi from './useApi';

const config: AxiosRequestConfig = {
  method: 'GET',
  url: '/configuration',
  headers: { 'Content-Type': 'application/json' },
};

const useGetConfig = (handleError?: (error: Error) => void) => {
  const [result, { fetchData }] = useApi<Config>(handleError);

  useEffect(() => {
    fetchData(config);
  }, [fetchData]);

  return result;
};

export default useGetConfig;
