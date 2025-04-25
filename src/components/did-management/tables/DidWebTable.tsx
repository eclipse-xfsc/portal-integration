import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../store/app-context';
import { NoPaddingFlexColumnContainer, NoPaddingFlexRowContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import DidWebModal from '../modal/DidWebModal';
import { getNewDidWeb } from '../utils/DidManagement-util';
import { DID_WEB_HEADERS } from '../utils/DidManagement-config';
import { DidWeb, DidWebKey } from '../utils/DidManagement-model';
import EditButton from '../../ui/EditButton';
import DeleteButton from '../../ui/DeleteButton';
import classes from '../DidManagement.module.scss';
import DidWebKeyModal from '../modal/DidWebKeyModal';
import useDidWebService from '../../../hooks/useDidWebService';

interface DidWebTableProps {
  didWebs?: DidWeb[];
  didWebSaved: () => void;
  didWebDeleted: () => void;
}

const DidWebTable = (props: DidWebTableProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [editData, setEditData] = useState<DidWeb>();
  const [editKeysData, setEditKeysData] = useState<DidWeb>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [showEditKeysWindow, setShowEditKeysWindow] = useState(false);
  const [, { deleteData: deleteDidWeb }] = useDidWebService();

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => props.didWebSaved();
  const handleExited = () => setEditData(undefined);
  const handleCloseKeysWindow = () => setShowEditKeysWindow(false);

  const handleNewDidWebAction = () => {
    setShowEditWindow(true);
    setEditData(getNewDidWeb());
  };

  const handleDeleteDidWeb = (didWebId?: number | string) => {
    deleteDidWeb(didWebId, () => props.didWebDeleted());
  };
  const editKeys = (didWeb: DidWeb) => {
    setShowEditKeysWindow(true);
    setEditKeysData(didWeb);
  };
  const didHost =
    window.location.host.includes('localhost') || window.location.host.includes('127.0.0.1')
      ? 'integration.gxfs.dev'
      : window.location.host;

  return (
    <>
      {props.didWebs && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <h3 className='pt-4 pb-2'>{t('did-management.web-header')}</h3>
          <GxfsTable
            headers={DID_WEB_HEADERS}
            bodyContent={
              <>
                {props.didWebs.map((didWeb) => (
                  <tr key={didWeb.id}>
                    <td>{didWeb?.name}</td>
                    <td>
                      <EditButton editAction={() => editKeys(didWeb)}></EditButton>
                    </td>
                    <td>
                      {didWeb?.keys?.length === 0 ? (
                        'did:web:' + didWeb?.did
                      ) : (
                        <a
                          target='_blank'
                          href={`https://${didHost}/api/dynamic${didWeb.path}`}
                        >
                          did:web:{didWeb?.did}
                        </a>
                      )}
                    </td>
                    <td>
                      <NoPaddingFlexRowContainer className={classes['table-buttons-container']}>
                        <DeleteButton deleteAction={() => handleDeleteDidWeb(didWeb.id)}></DeleteButton>
                      </NoPaddingFlexRowContainer>
                    </td>
                  </tr>
                ))}
              </>
            }
            onAddClick={handleNewDidWebAction}
          />
          <DidWebModal
            show={showEditWindow}
            title={t('did-management.new-did-web')}
            data={editData}
            handleSave={handleSave}
            handleClose={handleClose}
            handleExited={handleExited}
          />
          <DidWebKeyModal
            show={showEditKeysWindow}
            title={t('did-management.keys')}
            data={editKeysData}
            handleSave={handleSave}
            handleClose={handleCloseKeysWindow}
            handleExited={handleCloseKeysWindow}
          />
        </NoPaddingFlexColumnContainer>
      )}
    </>
  );
};
export default DidWebTable;
