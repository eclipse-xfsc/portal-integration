import { useTranslation } from 'react-i18next';
import classes from '../../claim-mapping/ClaimMapping.module.scss';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import { DidOCM } from '../utils/DidManagement-model';
import { convertDidOCMToTableBody } from '../utils/DidManagement-converter';
import { DID_OCM_HEADERS } from '../utils/DidManagement-config';

interface DidOCMTableProps {
  didOCMs?: DidOCM[];
}

const DidOCMTable = (props: DidOCMTableProps) => {
  const { t } = useTranslation();

  return (
    <>
      {props.didOCMs && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <h3 className='pt-4 pb-2'>{t('did-management.did-ocm-header')}</h3>
          <GxfsTable
            headers={DID_OCM_HEADERS}
            body={convertDidOCMToTableBody(props.didOCMs)}
          />
        </NoPaddingFlexColumnContainer>
      )}
    </>
  );
};
export default DidOCMTable;
