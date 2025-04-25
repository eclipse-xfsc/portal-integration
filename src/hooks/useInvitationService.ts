import { AxiosRequestConfig } from 'axios';
import { useCallback, useContext } from 'react';
import useApi from './useApi';
import AppContext from '../store/app-context';

export interface InvitationServiceModel {
  roleKeys: string[];
  templateEmailKeys: any;
}

const config: AxiosRequestConfig = {
  method: 'GET',
  url: '/principal/',
  headers: { 'Content-Type': 'application/json' },
};

const useInvitationService = () => {
  const { setError } = useContext(AppContext);
  const [options, { fetchData, sendData }] = useApi<InvitationServiceModel>(setError);

  const getOptions = useCallback(() => {
    fetchData({
      ...config,
      url: `${config.url}options`,
    });
  }, [fetchData]);

  const sendMessage = useCallback(
    (body: any, onSuccess?: () => void) => {
      sendData(
        {
          ...config,
          method: 'POST',
          url: `${config.url}sendInvitation`,
          data: body,
        },
        onSuccess
      );
    },
    [sendData]
  );

  return [options, { getOptions, sendMessage }] as const;
};

export default useInvitationService;
