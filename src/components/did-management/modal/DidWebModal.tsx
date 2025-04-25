import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataModificationModal, {DataModificationModalProps} from '../../ui/DataModificationModal';
import GxfsTextInput from '../../ui/GxfsTextInput';
import {onFormChangedFunction, submitForm} from '../../util/form-utils';
import {getNewDidWeb} from '../utils/DidManagement-util';
import {DidWeb} from '../utils/DidManagement-model';
import GxfsText from '../../ui/GxfsText';
import useDidWebService from '../../../hooks/useDidWebService';
import {Form} from 'react-bootstrap';
import IntroText from '../../ui/IntroText';

interface DidWebModalProps extends DataModificationModalProps {
  data?: DidWeb;
}

const DidWebModal = (props: DidWebModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(getNewDidWeb());
  const [, { add: addDidWeb }] = useDidWebService();
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(props.data ? props.data : getNewDidWeb());
  }, [props.data]);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleSave = () => {
    const onSuccess = () => {
      props.handleSave();
      props.handleClose();
    };

    addDidWeb(formData, onSuccess);
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

  return (
    <DataModificationModal
      show={props.show}
      handleClose={props.handleClose}
      handleSave={() => submitForm(formRef)}
      handleExited={props.handleExited}
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
          <IntroText text={t('did-management.did-web-intro-text')}></IntroText>
          <GxfsTextInput
            name='name'
            label={t('did-management.name')}
            valueChanged={onFormChanged}
            value={formData.name}
            required
          />
          <GxfsTextInput
            name='path'
            label={t('did-management.path')}
            valueChanged={onFormChanged}
            value={formData.path}
            required
          />
          <GxfsText
            label={t('did-management.key')}
            value={t('did-management.please-generate-key')}
          />
        </fieldset>
      </Form>
    </DataModificationModal>
  );
};

export default DidWebModal;
