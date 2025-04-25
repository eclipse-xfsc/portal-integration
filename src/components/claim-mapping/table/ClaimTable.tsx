import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import ClaimModal from '../modal/ClaimModal';
import { CLAIM_HEADERS } from '../utils/ClaimMapping-config';
import { convertClaimToTableBody } from '../utils/ClaimMapping-converter';
import { ClaimMappingClaim } from '../utils/ClaimMapping-model';
import classes from '../ClaimMapping.module.scss';
import AppContext from '../../../store/app-context';
import useClaimService from '../../../hooks/useClaimService';
import { getNewClaim } from '../utils/ClaimMapping-util';

interface ClaimTableProps {
  claims?: ClaimMappingClaim[];
  claimSaved: () => void;
  claimDeleted: () => void;
}
const ClaimTable = (props: ClaimTableProps) => {
  const { t } = useTranslation();
  const [editData, setEditData] = useState<ClaimMappingClaim>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const { setError } = useContext(AppContext);
  const [, { deleteData: deleteClaim }] = useClaimService<ClaimMappingClaim[]>(setError);

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => props.claimSaved();
  const handleExited = () => setEditData(undefined);

  const handleEditClaimAction = (claimId?: number | string) => {
    setShowEditWindow(true);
    setEditData(props.claims?.find((item) => item.id === claimId));
  };
  const handleNewClaimAction = () => {
    setShowEditWindow(true);
    setEditData(getNewClaim());
  };

  const handleDeleteClaim = (claimId?: number | string) => {
    deleteClaim(claimId, () => props.claimDeleted());
  };

  return (
    <>
      {props.claims && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <h3>{t('claim-mapping.create-claim')}</h3>

          <GxfsTable
            headers={CLAIM_HEADERS}
            body={convertClaimToTableBody(props.claims)}
            onDeleteClick={handleDeleteClaim}
            onEditClick={handleEditClaimAction}
            onAddClick={handleNewClaimAction}
          />

          <ClaimModal
            show={showEditWindow}
            title={t(!editData ? 'claim-mapping.create-new-claim' : 'claim-mapping.edit-claim')}
            data={editData}
            handleSave={handleSave}
            handleClose={handleClose}
            handleExited={handleExited}
          />
        </NoPaddingFlexColumnContainer>
      )}
    </>
  );
};
export default ClaimTable;
