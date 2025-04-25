import { useKeycloak } from '@react-keycloak/web';
import { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';
import Error from '../error/Error';
import useApi from './useApi';

const config: AxiosRequestConfig = {
  method: 'POST',
  url: '/principal/',
  headers: { 'Content-Type': 'application/json' },
};

const usePrincipalService = (handleError?: (error: Error) => void) => {
  const { keycloak } = useKeycloak();
  const [qrCodeData, { fetchData, setFetchResult: setQrCodeData }] = useApi<string>(handleError);

  const createCredential = useCallback(
    (roleList: string[]) => {
        config.url = `${config.url}createCredential`;
        config.data = { selectedRoleKeys: roleList };
        // @ts-ignore
        config.headers =  { ...config.headers, Authorization: `Bearer ${keycloak.token}` };
      fetchData(config,
        (data) => data.invitationUrl
      );
    },
    [fetchData, keycloak.token]
  );

  const clearQrCodeData = () => setQrCodeData('');

  return [qrCodeData, { createCredential, clearQrCodeData }] as const;
};

export default usePrincipalService;
