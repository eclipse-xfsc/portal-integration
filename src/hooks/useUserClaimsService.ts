import { useCallback } from 'react';
import Error from '../error/Error';
import useApi from './useApi';

interface ClaimInfo {
  context: string;
  claims: ClaimInfoItem[];
}
interface ClaimInfoItem {
  context: string;
  Claim: string;
}

const url = '/claim-mapping/claims';

const isClaimInfoValid = (claimInfo: ClaimInfo): boolean => {
  return claimInfo.claims?.length > 0 && !!claimInfo.claims[0].Claim;
};

const transformData = <T>(claimInfos: ClaimInfo[]): T => {
  if (claimInfos?.length > 0) {
    return claimInfos.filter(isClaimInfoValid).map((claimInfo: ClaimInfo) => {
      return claimInfo.claims[0].Claim;
    }) as T;
  }
  return [] as T;
};

const useUserClaimsService = <T>(handleError?: (error: Error) => void) => {
  const [result, { fetchData }] = useApi<T>(handleError);

  const load = useCallback(() => {
    fetchData({ method: 'get', url }, transformData);
  }, [fetchData]);

  return [result, { load }] as const;
};

export default useUserClaimsService;
