import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import RoleModal from '../modal/RoleModal';
import { convertRoleToTableBody } from '../utils/ClaimMapping-converter';
import { ClaimMappingRole } from '../utils/ClaimMapping-model';
import { ROLE_HEADERS } from '../utils/ClaimMapping-config';
import classes from '../ClaimMapping.module.scss';
import AppContext from '../../../store/app-context';
import useRoleService from '../../../hooks/useRoleService';
import { getNewRole } from '../utils/ClaimMapping-util';

interface RoleTableProps {
  roles?: ClaimMappingRole[];
  roleSaved: () => void;
  roleDeleted: () => void;
}
const RoleTable = (props: RoleTableProps) => {
  const { t } = useTranslation();
  const [editData, setEditData] = useState<ClaimMappingRole>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const { setError } = useContext(AppContext);
  const [, { deleteData: deleteRole }] = useRoleService<ClaimMappingRole[]>(setError);

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => props.roleSaved();
  const handleExited = () => setEditData(undefined);

  const handleEditRoleAction = (roleId?: number | string) => {
    setShowEditWindow(true);
    setEditData(props.roles?.find((item) => item.id === roleId));
  };
  const handleNewRoleAction = () => {
    setShowEditWindow(true);
    setEditData(getNewRole());
  };

  const handleDeleteRole = (roleId?: number | string) => {
    deleteRole(roleId, () => props.roleDeleted());
  };

  return (
    <>
      {props.roles && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <h3>{t('claim-mapping.create-role')}</h3>

          <GxfsTable
            headers={ROLE_HEADERS}
            body={convertRoleToTableBody(props.roles)}
            onDeleteClick={handleDeleteRole}
            onEditClick={handleEditRoleAction}
            onAddClick={handleNewRoleAction}
          />

          <RoleModal
            show={showEditWindow}
            title={t(!editData ? 'claim-mapping.create-new-role' : 'claim-mapping.edit-role')}
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
export default RoleTable;
