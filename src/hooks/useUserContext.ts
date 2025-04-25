import {useContext} from 'react';
import Error from '../error/Error';
import AppContext from '../store/app-context';

interface UserProfile {
  fedId?: string;
}

interface UserContext {
  access_token?: string;
  profile?: UserProfile;
}

const useUserContext = <T>() => {
  const { setError } = useContext(AppContext);

  const getUserContext = (): UserContext => {
    try {
      const storage = sessionStorage.getItem('oidc.user:https://aas-integration.gxfs.dev:gxfs-portal');
      return JSON.parse(storage as string);
    } catch (error) {
      console.warn('Obtaining User Context Failed', error);
      setError(error as Error);
      return {};
    }
  };
  return getUserContext;
};

export default useUserContext;
