import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import { SelectItem } from '../../ui/GxfsSelect';
import GxfsTable from '../../ui/GxfsTable';
import { CLAIM_MAPPING_HEADERS } from '../utils/ClaimMapping-config';
import { convertClaimMappingToTableBody } from '../utils/ClaimMapping-converter';
import { ClaimMapping } from '../utils/ClaimMapping-model';
import ClaimMappingModal from '../modal/ClaimMappingModal';
import classes from '../ClaimMapping.module.scss';
import AppContext from '../../../store/app-context';
import useClaimMappingService from '../../../hooks/useClaimMappingService';
import { getNewClaimMapping } from '../utils/ClaimMapping-util';

interface ClaimMappingTableProps {
  claimMappings?: ClaimMapping[];
  roleSelectItems: SelectItem[];
  claimSelectItems: SelectItem[];
  mappingSaved: () => void;
  mappingDeleted: () => void;
}

const ClaimMappingTable = (props: ClaimMappingTableProps) => {
  const { t } = useTranslation();
  const [editData, setEditData] = useState<ClaimMapping>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [, { deleteData: deleteClaimMapping }] = useClaimMappingService();

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => props.mappingSaved();
  const handleExited = () => setEditData(undefined);

  const handleEditClaimMappingAction = (claimMappingId?: number | string) => {
    setShowEditWindow(true);
    setEditData(props.claimMappings?.find((item) => item.id === claimMappingId));
  };

  const handleNewClaimMappingAction = () => {
    setShowEditWindow(true);
    setEditData(getNewClaimMapping());
  };

  const handleDelete = (claimMappingId?: number | string) => {
    deleteClaimMapping(claimMappingId, () => props.mappingDeleted());
  };

  return (
    <>
      {props.claimMappings && (
        <NoPaddingFlexColumnContainer className='row-gap-1'>
          <h3>{t('claim-mapping.mapping-overview')}</h3>

          <GxfsTable
            headers={CLAIM_MAPPING_HEADERS}
            body={convertClaimMappingToTableBody(props.claimMappings, props.roleSelectItems, props.claimSelectItems)}
            onDeleteClick={handleDelete}
            onEditClick={handleEditClaimMappingAction}
            onAddClick={handleNewClaimMappingAction}
          />

          <ClaimMappingModal
            show={showEditWindow}
            title={t(!editData ? 'claim-mapping.create-new-mapping' : 'claim-mapping.edit-mapping')}
            data={editData}
            roleSelectItems={props.roleSelectItems}
            claimSelectItems={props.claimSelectItems}
            handleSave={handleSave}
            handleClose={handleClose}
            handleExited={handleExited}
          />
        </NoPaddingFlexColumnContainer>
      )}
    </>
  );
};

export default ClaimMappingTable;
