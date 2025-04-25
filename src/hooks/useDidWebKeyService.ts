import { AxiosRequestConfig } from 'axios';
import { useCallback, useContext } from 'react';
import useApi from './useApi';
import AppContext from '../store/app-context';
import { DidWeb } from '../components/did-management/utils/DidManagement-model';

const url = (webId?: string | number): string => `/did-management/did/web/${webId}/key`;
const transformData = (items: any[]): DidWeb[] => {
  return items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      path: item.path,
      did: item.id.replaceAll('-', ':'),
    };
  });
};

const useDidWebKeyService = () => {
  const { setError } = useContext(AppContext);
  const [result, { fetchData, sendData }] = useApi<DidWeb[]>(setError);

  const rotate = useCallback(
    (webId?: number | string, name?: string, onSuccess?: () => void) => {
      fetchData({ method: 'get', url: `${url(webId)}/${name}/rotate` }, transformData, onSuccess);
    },
    [fetchData]
  );

  const add = useCallback(
    (body: any, webId?: number | string, onSuccess?: () => void) => {
      sendData({ method: 'post', url: url(webId), data: body }, onSuccess);
    },
    [sendData]
  );

  const deleteData = useCallback(
    (webId?: number | string, name?: string, onSuccess?: () => void) => {
      sendData({ method: 'delete', url: `${url(webId)}/${name}` }, onSuccess);
    },
    [sendData]
  );

  return [result, { rotate, add, deleteData }] as const;
};

export default useDidWebKeyService;
