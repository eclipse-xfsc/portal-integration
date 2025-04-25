import { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';
import { Identifiable } from '../components/util/common-model';
import Error from '../error/Error';
import useApi from './useApi';

const config: AxiosRequestConfig = {
  method: 'GET',
  url: '/notarization-request/',
  headers: { 'Content-Type': 'application/json' },
};

const useNotarizationRequestService = <T>(handleError?: (error: Error) => void) => {
  const [result, { fetchData, sendData }] = useApi<T>(handleError);

  const load = useCallback(() => {
    fetchData({ ...config, url: `${config.url}` });
  }, [fetchData]);

  const add = useCallback(
    (body: any, onSuccess?: () => void) => {
      sendData({ ...config, method: 'post', data: body }, onSuccess);
    },
    [sendData]
  );

  const update = useCallback(
    (body: Identifiable, onSuccess?: () => void) => {
      sendData({ ...config, method: 'put', url: `${config.url}${body.id}`, data: body }, onSuccess);
    },
    [sendData]
  );

  const deleteData = useCallback(
    (id?: number, onSuccess?: () => void) => {
      sendData({ ...config, method: 'delete', url: `${config.url}${id}` }, onSuccess);
    },
    [sendData]
  );

  return [result, { load, add, update, deleteData }] as const;
};

export default useNotarizationRequestService;
