import { useCallback, useContext } from 'react';
import useApi from './useApi';
import AppContext from '../store/app-context';
import { DidOCM, DidWeb } from '../components/did-management/utils/DidManagement-model';

const url = `/did-management/did/ocm`;
const transformData = (items: any[]): DidOCM[] => {
  return items.map((item) => {
    return {
      isInitialized: item.isInitialized,
      label: item.label,
      did: item.publicDid?.did,
      verkey: item.publicDid?.verkey,
    };
  });
};

const useDidOCMService = () => {
  const { setError } = useContext(AppContext);
  const [result, { fetchData, sendData }] = useApi<DidWeb[]>(setError);

  const load = useCallback(
    (onSuccess?: () => void) => {
      fetchData({ method: 'get', url }, transformData, onSuccess);
    },
    [fetchData]
  );
  return [result, { load }] as const;
};

export default useDidOCMService;
