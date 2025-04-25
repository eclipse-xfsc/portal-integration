import { ClaimMappingClaimForm, ClaimMappingForm, ClaimMappingRoleForm } from './ClaimMapping-model';

export const getNewClaimMapping = (): ClaimMappingForm => {
  return { name: '', description: '', rowversion: 1, claimId: -1, roleId: -1 } as ClaimMappingForm;
};
export const getNewClaim = (): ClaimMappingClaimForm => {
  return { name: '' };
};
export const getNewRole = (): ClaimMappingRoleForm => {
  return { name: '' };
};
