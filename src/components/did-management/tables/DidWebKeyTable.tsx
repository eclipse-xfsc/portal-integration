import { useTranslation } from 'react-i18next';
import classes from '../../claim-mapping/ClaimMapping.module.scss';
import { NoPaddingFlexColumnContainer, NoPaddingFlexRowContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import { DidWeb, DidWebKey } from '../utils/DidManagement-model';
import uiClasses from '../../ui/UI.module.scss';
import { DID_WEB_KEY_HEADERS } from '../utils/DidManagement-config';
import DeleteButton from '../../ui/DeleteButton';
import RefreshButton from '../../ui/RefreshButton';
import CopyButton from '../../ui/CopyButton';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import useDidWebKeyService from '../../../hooks/useDidWebKeyService';

interface DidWebKeyTableProps {
  didWeb?: DidWeb;
  handleChange: () => void;
}

const DidWebKeyTable = (props: DidWebKeyTableProps) => {
  const { t } = useTranslation();
  const [, { deleteData: deleteDidWebKey, rotate: rotateDidWebKey }] = useDidWebKeyService();

  const [value, copy] = useCopyToClipboard();

  const handleDeleteDidWebKey = (webKey: DidWebKey) => {
    deleteDidWebKey(props.didWeb?.id, webKey.name, () => props.handleChange());
  };
  const refreshItem = (webKey: DidWebKey) => {
    rotateDidWebKey(props.didWeb?.id, webKey.name, () => props.handleChange());
  };
  const copyItem = (webKey: DidWebKey) => {
    copy(webKey.public_key || '');
  };

  return (
    <>
      {props.didWeb?.keys && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <GxfsTable
            headers={DID_WEB_KEY_HEADERS}
            variant='light-grey'
            bodyContent={
              <>
                {props.didWeb?.keys.map((didWebKey, index) => (
                  <tr key={index}>
                    <td>{didWebKey.name}</td>
                    <td>
                      <CopyButton clickAction={() => copyItem(didWebKey)}></CopyButton>
                    </td>
                    <td>{didWebKey.path}</td>
                    <td>
                      <NoPaddingFlexRowContainer className={uiClasses['table-buttons-container']}>
                        <RefreshButton clickAction={() => refreshItem(didWebKey)}></RefreshButton>
                        <DeleteButton deleteAction={() => handleDeleteDidWebKey(didWebKey)}></DeleteButton>
                      </NoPaddingFlexRowContainer>
                    </td>
                  </tr>
                ))}
              </>
            }
          />
        </NoPaddingFlexColumnContainer>
      )}
    </>
  );
};
export default DidWebKeyTable;
