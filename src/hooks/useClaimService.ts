import { useCallback } from 'react';
import { Identifiable } from '../components/util/common-model';
import Error from '../error/Error';
import useApi from './useApi';

const url = '/claim-mapping/list/claims';
const transformData = <T>(claims: any[]): T => {
  return claims.map((claim) => {
    return {
      id: claim.Id,
      name: claim.Claim,
      rowversion: claim.RowVer,
    };
  }) as T;
};

const useClaimService = <T>(handleError?: (error: Error) => void) => {
  const [result, { fetchData, sendData }] = useApi<T>(handleError);

  const load = useCallback(() => {
    fetchData({ method: 'get', url }, transformData);
  }, [fetchData]);

  const add = useCallback(
    (body: Identifiable[], onSuccess?: () => void) => {
      sendData({ method: 'post', url, data: body }, onSuccess);
    },
    [sendData]
  );

  const update = useCallback(
    (body: Identifiable, onSuccess?: () => void) => {
      sendData({ method: 'put', url: `${url}?id=${body.id}`, data: body }, onSuccess);
    },
    [sendData]
  );

  const deleteData = useCallback(
    (id?: number | string, onSuccess?: () => void) => {
      sendData({ method: 'delete', url: `${url}?id=${id}` }, onSuccess);
    },
    [sendData]
  );

  return [result, { load, add, update, deleteData }] as const;
};

export default useClaimService;
