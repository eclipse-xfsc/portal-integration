import {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import useArticleService from '../../../hooks/useArticleService';
import AppContext from '../../../store/app-context';
import DataModificationModal, {DataModificationModalProps} from '../../ui/DataModificationModal';
import GxfsTextInput from '../../ui/GxfsTextInput';
import {onFormChangedFunction, submitForm} from '../../util/form-utils';
import {getNewDidConfig} from '../utils/DidManagement-util';
import {DidConfig} from '../utils/DidManagement-model';
import {ArticleCategory} from '../../article-news/utils/ArticleNews-model';
import GxfsTable from '../../ui/GxfsTable';
import {DID_WEB_SELECT_HEADERS} from '../utils/DidManagement-config';
import GxfsText from '../../ui/GxfsText';
import Checkbox from '../../ui/Checkbox';
import classes from '../../ui/UI.module.scss';
import {NoPaddingFlexColumnContainer, NoPaddingFlexRowContainer} from '../../ui/container';
import {Form} from 'react-bootstrap';
import IntroText from '../../ui/IntroText';

interface DidConfigModalProps extends DataModificationModalProps {
  data?: DidConfig;
}

const DidConfigModal = (props: DidConfigModalProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [formData, setFormData] = useState(getNewDidConfig());
  const [, { update: updateDidConfig, add: addDidConfig }] = useArticleService<DidConfig[]>(
    ArticleCategory.ARTICLE,
    setError
  );
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(props.data ? props.data : getNewDidConfig());
  }, [props.data]);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleSave = () => {
    const onSuccess = () => {
      props.handleSave();
      props.handleClose();
    };

    formData.id ? updateDidConfig(formData, onSuccess) : addDidConfig(formData, onSuccess);
  };

  const handleValidateAndSave = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      handleSave();
    }
  };

  const handleSelect = (active: boolean) => {
    console.log('handleSelect', active);
    // TODO
  };

  return (
    <DataModificationModal
      show={props.show}
      handleClose={props.handleClose}
      handleSave={() => submitForm(formRef)}
      handleExited={props.handleExited}
      title={props.title}
      dialogClass='modal-article-news'
    >
      {' '}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleValidateAndSave}
        ref={formRef}
      >
        <fieldset>
          <IntroText text={t('did-management.did-config-intro-text')}></IntroText>
          <GxfsTextInput
            name='name'
            label={t('did-management.name')}
            valueChanged={onFormChanged}
            value={formData.name}
            required
          />
        </fieldset>
      </Form>
      <div className='gxfs-font-dark-small-normal mb-2'>{t('did-management.select-did-web')}</div>
      <NoPaddingFlexColumnContainer className={`${classes['row-gab-1rem']} pb-3`}>
        <GxfsTable
          headers={DID_WEB_SELECT_HEADERS}
          ignoreEmptyHeader
          variant='light-grey'
          bodyContent={
            <tr>
              <td>Name</td>
              <td>did/web/path</td>
              <td>
                <NoPaddingFlexRowContainer className={classes['table-buttons-container']}>
                  <Checkbox
                    switchAction={(active) => handleSelect(active)}
                    value={true}
                  />
                </NoPaddingFlexRowContainer>
              </td>
            </tr>
          }
        />
      </NoPaddingFlexColumnContainer>
      <GxfsText
        label={t('did-management.domain')}
        value={'Wird vorgegeben, nur anzeigen'}
      />
    </DataModificationModal>
  );
};

export default DidConfigModal;
