import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

const useGetTokenData = <T>(token: string) => {
  const [tokenDataResult, setTokenDataResult] = useState<T>();

  useEffect(() => {
    token ? setTokenDataResult(jwtDecode(token) as T) : setTokenDataResult(undefined);
  }, [token]);

  return tokenDataResult;
};

export default useGetTokenData;
