import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../store/app-context';
import DataModificationModal from '../../ui/DataModificationModal';
import GxfsTextInput from '../../ui/GxfsTextInput';
import { onFormChangedFunction, submitForm } from '../../util/form-utils';
import { getNewCredentialSettings, getNewNotarizationRequest } from '../utils/Notarization-util';
import { CredentialSettings } from '../utils/Notarization-model';
import useCredentialSettingsService from '../../../hooks/useCredentialSettingsService';
import IntroText from '../../ui/IntroText';
import { Form } from 'react-bootstrap';

interface CredentialSettingsModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
}

const CredentialSettingsModal = (props: CredentialSettingsModalProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [formData, setFormData] = useState(getNewCredentialSettings());
  const [, { add: addCredentialSettings }] = useCredentialSettingsService<CredentialSettings[]>(setError);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleSave = () => {
    addCredentialSettings(formData, props.handleClose);
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

  const close = () => {
    setFormData(getNewNotarizationRequest());
    props.handleClose();
  };

  return (
    <DataModificationModal
      show={props.show}
      handleClose={close}
      handleSave={() => submitForm(formRef)}
      title={props.title}
      dialogClass='modal-article-news'
    >
      <Form
        noValidate
        validated={validated}
        onSubmit={handleValidateAndSave}
        ref={formRef}
      >
        <fieldset>
          <IntroText text={t('notarization.credential-settings-intro-text')}></IntroText>
          <GxfsTextInput
            name='name'
            label={t('notarization.name')}
            valueChanged={onFormChanged}
            value={formData.name}
            required
          />
          <GxfsTextInput
            name='company'
            label={t('notarization.company')}
            valueChanged={onFormChanged}
            value={formData.company}
            required
          />
          <GxfsTextInput
            name='address'
            label={t('notarization.address')}
            valueChanged={onFormChanged}
            value={formData.address}
            required
          />
        </fieldset>
      </Form>
    </DataModificationModal>
  );
};

export default CredentialSettingsModal;
