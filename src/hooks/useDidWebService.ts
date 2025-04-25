import { AxiosRequestConfig } from 'axios';
import { useCallback, useContext } from 'react';
import useApi from './useApi';
import AppContext from '../store/app-context';
import { DidWeb } from '../components/did-management/utils/DidManagement-model';

const url = '/did-management/did/web';
const transformData = (items: any[]): DidWeb[] => {
  return items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      path: item.path,
      did: item.id.replaceAll('-', ':'),
      keys: item.keys
        ? item.keys.map((key: any) => {
            return {
              key: key.name,
              name: key.name,
              public_key: key.public_key,
              path: item.path,
            };
          })
        : [],
    };
  });
};

const useDidWebService = () => {
  const { setError } = useContext(AppContext);
  const [result, { fetchData, sendData }] = useApi<DidWeb[]>(setError);

  const load = useCallback(() => {
    fetchData({ method: 'get', url }, transformData);
  }, [fetchData]);

  const add = useCallback(
    (body: any, onSuccess?: () => void) => {
      sendData({ method: 'post', url, data: body }, onSuccess);
    },
    [sendData]
  );

  const deleteData = useCallback(
    (id?: number | string, onSuccess?: () => void) => {
      sendData({ method: 'delete', url: `${url}/${id}` }, onSuccess);
    },
    [sendData]
  );

  return [result, { load, add, deleteData }] as const;
};

export default useDidWebService;
