import { TableBody } from '../../ui/GxfsTable';
import {
  ClaimMapping,
  ClaimMappingClaim,
  ClaimMappingClaimDto,
  ClaimMappingClaimForm,
  ClaimMappingDto,
  ClaimMappingForm,
  ClaimMappingRole,
  ClaimMappingRoleDto,
  ClaimMappingRoleForm,
} from './ClaimMapping-model';
import { CLAIM_MAPPING_CONTEXT } from './ClaimMapping-config';
import { SelectItem } from '../../ui/GxfsSelect';

export const convertClaimMappingToForm = (claimMapping: ClaimMapping): ClaimMappingForm => {
  return {
    id: claimMapping.id,
    rowversion: claimMapping.rowversion,
    name: claimMapping.name,
    description: claimMapping.description,
    roleId: claimMapping.roleId as number,
    claimId: claimMapping.claimId as number,
  };
};

export const convertClaimMappingToTableBody = (
  claimMappings: ClaimMapping[],
  roleSelectItems: SelectItem[],
  claimSelectItems: SelectItem[]
): TableBody[] => {
  return claimMappings.map((item) => {
    const role = roleSelectItems.find((role) => role.id === item.roleId);
    const claim = claimSelectItems.find((claim) => claim.id === item.claimId);
    return { id: item.id, data: [item.name, item.description, claim?.value, role?.value, item.context] };
  });
};

export const convertClaimToTableBody = (claimMappings: ClaimMappingClaim[]): TableBody[] => {
  return claimMappings.map((item) => {
    return { id: item.id, data: [item.name] };
  });
};

export const convertRoleToTableBody = (claimMappings: ClaimMappingRole[]): TableBody[] => {
  return claimMappings.map((item) => {
    return { id: item.id, data: [item.name] };
  });
};
export const convertClaimMappingFormToDto = (item: ClaimMappingForm): ClaimMappingDto => {
  return {
    id: item.id,
    rowversion: item.rowversion,
    name: item.name,
    description: item.description,
    desc: item.description,
    role_id: item.roleId,
    claim_id: item.claimId,
    context: item.context || CLAIM_MAPPING_CONTEXT,
  };
};
export const convertClaimFormToDto = (item: ClaimMappingClaimForm): ClaimMappingClaimDto => {
  return { id: item.id, claim: item.name, rowversion: item.rowversion };
};
export const convertRoleFormToDto = (item: ClaimMappingRoleForm): ClaimMappingRoleDto => {
  return { id: item.id, role: item.name, rowversion: item.rowversion };
};
