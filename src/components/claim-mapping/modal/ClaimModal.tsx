import {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataModificationModal, {DataModificationModalProps} from '../../ui/DataModificationModal';
import GxfsTextInput from '../../ui/GxfsTextInput';
import {onFormChangedFunction, submitForm} from '../../util/form-utils';
import {ClaimMappingClaim} from '../utils/ClaimMapping-model';
import {getNewClaim} from '../utils/ClaimMapping-util';
import AppContext from '../../../store/app-context';
import useClaimService from '../../../hooks/useClaimService';
import { convertClaimFormToDto } from '../utils/ClaimMapping-converter';
import IntroText from '../../ui/IntroText';
import {Form} from 'react-bootstrap';

interface ClaimModalProps extends DataModificationModalProps {
  data?: ClaimMappingClaim;
}

const ClaimModal = (props: ClaimModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(getNewClaim());
  const { setError } = useContext(AppContext);
  const [, { update: updateClaim, add: addClaim }] = useClaimService<ClaimMappingClaim[]>(setError);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(props.data ? props.data : getNewClaim());
  }, [props.data]);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleSave = () => {
    const onSuccess = () => {
      props.handleSave();
      props.handleClose();
    };
    const dto = convertClaimFormToDto(formData);
    dto.id ? updateClaim(dto, onSuccess) : addClaim([dto], onSuccess);
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
    >
      <Form
        noValidate
        validated={validated}
        onSubmit={handleValidateAndSave}
        ref={formRef}
      >
        <fieldset>
          <IntroText text={t('claim-mapping.claim-intro-text')}></IntroText>
          <GxfsTextInput
            name='name'
            label={t('claim-mapping.claim-name')}
            valueChanged={onFormChanged}
            value={formData.name}
            required
          />
        </fieldset>
      </Form>
    </DataModificationModal>
  );
};

export default ClaimModal;
