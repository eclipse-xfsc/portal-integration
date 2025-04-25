import Error from '../error/Error';
import { useCallback, useContext, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import AppContext from '../store/app-context';
import { useNavigate } from 'react-router-dom';

const logoutConfig: AxiosRequestConfig = {
  method: 'get',
  headers: { 'Content-Type': 'application/json' },
};

const useLogoutApi = (handleError?: (error: Error) => void) => {
  const { config } = useContext(AppContext);

  const logOut = useCallback(
    async (onSuccess?: () => void) => {
      try {
        logoutConfig.url = `${config?.oidc?.external?.authority}/.well-known/openid-configuration`;
        const logoutInfo = await axios.create().request(logoutConfig);
        console.log(logoutInfo);

        logoutConfig.url = logoutInfo.data?.end_session_endpoint;
        logoutConfig.withCredentials = true;
        await axios.create().request(logoutConfig);
        onSuccess && onSuccess();
      } catch (error) {
        console.log(error);

        handleError && handleError(error as Error);
      }
    },
    [handleError]
  );

  return [logOut] as const;
};

export default useLogoutApi;
