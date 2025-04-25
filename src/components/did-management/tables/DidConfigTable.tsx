import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useArticleService from '../../../hooks/useArticleService';
import AppContext from '../../../store/app-context';
import classes from '../../claim-mapping/ClaimMapping.module.scss';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import { ArticleCategory } from '../../article-news/utils/ArticleNews-model';
import { DidConfig } from '../utils/DidManagement-model';
import { convertDidConfigToTableBody } from '../utils/DidManagement-converter';
import DidConfigModal from '../modal/DidConfigModal';
import { getNewDidConfig } from '../utils/DidManagement-util';
import { DID_CONFIG_HEADERS } from '../utils/DidManagement-config';

interface DidConfigTableProps {
  didConfigs?: DidConfig[];
  didConfigSaved: () => void;
  didConfigDeleted: () => void;
}

const DidConfigTable = (props: DidConfigTableProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [editData, setEditData] = useState<DidConfig>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [, { deleteData: deleteDidConfig }] = useArticleService<DidConfig[]>(ArticleCategory.CAROUSEL, setError);

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => props.didConfigSaved();
  const handleExited = () => setEditData(undefined);

  const handleNewDidConfigAction = () => {
    setShowEditWindow(true);
    setEditData(getNewDidConfig());
  };

  const handleDeleteDidConfig = (didConfigId?: number | string) => {
    deleteDidConfig(didConfigId, () => props.didConfigDeleted());
  };

  return (
    <>
      {props.didConfigs && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <h3 className='pt-4 pb-2'>{t('did-management.config-header')}</h3>
          <GxfsTable
            headers={DID_CONFIG_HEADERS}
            body={convertDidConfigToTableBody(props.didConfigs)}
            onDeleteClick={handleDeleteDidConfig}
            onAddClick={handleNewDidConfigAction}
          />
          <DidConfigModal
            show={showEditWindow}
            title={t('did-management.new-did-config')}
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
export default DidConfigTable;
