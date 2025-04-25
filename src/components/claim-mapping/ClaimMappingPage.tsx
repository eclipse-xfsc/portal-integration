import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../ui/Banner';
import { ContentContainer, FlexColumnContainer } from '../ui/container';
import { SelectItem } from '../ui/GxfsSelect';
import { BannerMode } from '../ui/UI-model';
import classes from './ClaimMapping.module.scss';
import ClaimMappingTable from './table/ClaimMappingTable';
import ClaimTable from './table/ClaimTable';
import RoleTable from './table/RoleTable';
import { ClaimMapping, ClaimMappingClaim, ClaimMappingRole } from './utils/ClaimMapping-model';
import AppContext from '../../store/app-context';
import useRoleService from '../../hooks/useRoleService';
import useClaimService from '../../hooks/useClaimService';
import useClaimMappingService from '../../hooks/useClaimMappingService';

const ClaimMappingPage = () => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [roles, { load: loadRoles }] = useRoleService<ClaimMappingRole[]>(setError);
  const [claims, { load: loadClaims }] = useClaimService<ClaimMappingClaim[]>(setError);
  const [claimMappings, { load: loadClaimMappings }] = useClaimMappingService();
  const [roleSelectItems, setRoleSelectItems] = useState([] as SelectItem[]);
  const [claimSelectItems, setClaimSelectItems] = useState([] as SelectItem[]);

  const setClaimsData = (claimsForUpdate: ClaimMappingClaim[]) => {
    const selectItems = claimsForUpdate.map((claim) => {
      return { id: claim.id, value: claim.name } as SelectItem;
    });
    setClaimSelectItems(selectItems);
  };

  const setRolesData = (rolesForUpdate: ClaimMappingRole[]) => {
    const selectItems = rolesForUpdate.map((claim) => {
      return { id: claim.id, value: claim.name } as SelectItem;
    });
    setRoleSelectItems(selectItems);
  };

  useEffect(() => {
    loadClaimMappings();
    loadClaims();
    loadRoles();
  }, [loadRoles, loadClaims, loadClaimMappings]);

  useEffect(() => {
    if (roles) {
      setRolesData(roles);
    }
  }, [roles]);
  useEffect(() => {
    if (claims) {
      setClaimsData(claims);
    }
  }, [claims]);

  return (
    <ContentContainer className={classes['row-gab-2rem']}>
      <Banner
        mode={BannerMode.CLAIM_MAPPING}
        title={t('claim-mapping.banner')}
      />
      <FlexColumnContainer className={classes['row-gab-2rem']}>
        <h2>{t('claim-mapping.headline')}</h2>

        <ClaimMappingTable
          mappingDeleted={loadClaimMappings}
          mappingSaved={loadClaimMappings}
          claimMappings={claimMappings}
          claimSelectItems={claimSelectItems}
          roleSelectItems={roleSelectItems}
        />

        <RoleTable
          roleDeleted={loadRoles}
          roleSaved={loadRoles}
          roles={roles}
        />

        <ClaimTable
          claimDeleted={loadClaims}
          claimSaved={loadClaims}
          claims={claims}
        />
      </FlexColumnContainer>
    </ContentContainer>
  );
};

export default ClaimMappingPage;
