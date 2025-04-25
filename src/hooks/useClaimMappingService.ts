import { useCallback, useContext } from 'react';
import { Identifiable } from '../components/util/common-model';
import useApi from './useApi';
import { ClaimMapping } from '../components/claim-mapping/utils/ClaimMapping-model';
import AppContext from '../store/app-context';

const url = '/claim-mapping/list/mappings';
const transformData = (mappings: any[]): ClaimMapping[] => {
  return mappings.map((mapping) => {
    return {
      id: mapping.Id,
      rowversion: mapping.RowVer,
      claimId: mapping.Claim_Id,
      roleId: mapping.Role_Id,
      name: mapping.Name,
      description: mapping.Description,
      context: mapping.Context,
    };
  });
};

const useClaimMappingService = () => {
  const { setError } = useContext(AppContext);
  const [result, { fetchData, sendData }] = useApi<ClaimMapping[]>(setError);

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

export default useClaimMappingService;
