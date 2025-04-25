import { AbstractEntity } from '../../util/common-model';

export interface ClaimMappingRole extends AbstractEntity {
  name: string;
}

export interface ClaimMappingClaim extends AbstractEntity {
  name: string;
}

export interface ClaimMapping extends AbstractEntity {
  name: string;
  description: string;
  claimId?: number | null;
  roleId?: number | null;
  context?: string;
}

export interface ClaimMappingForm extends AbstractEntity {
  name: string;
  description: string;
  claimId?: number;
  roleId?: number;
  context?: string;
}

export interface ClaimMappingClaimForm extends AbstractEntity {
  name: string;
}
export interface ClaimMappingRoleForm extends AbstractEntity {
  name: string;
}
export interface ClaimMappingDto extends AbstractEntity {
  name: string;
  description: string;
  desc: string;
  claim_id?: number;
  role_id?: number;
  context?: string;
}

export interface ClaimMappingClaimDto extends AbstractEntity {
  claim: string;
}
export interface ClaimMappingRoleDto extends AbstractEntity {
  role: string;
}
