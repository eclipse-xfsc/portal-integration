import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataModificationModal, {DataModificationModalProps} from '../../ui/DataModificationModal';
import GxfsSelect, {SelectItem} from '../../ui/GxfsSelect';
import GxfsTextInput from '../../ui/GxfsTextInput';
import {onFormChangedFunction, submitForm} from '../../util/form-utils';
import {convertClaimMappingFormToDto, convertClaimMappingToForm} from '../utils/ClaimMapping-converter';
import {ClaimMapping} from '../utils/ClaimMapping-model';
import {getNewClaimMapping} from '../utils/ClaimMapping-util';
import useClaimMappingService from '../../../hooks/useClaimMappingService';
import uuid from 'react-uuid';
import useUserContext from '../../../hooks/useUserContext';
import {Form} from 'react-bootstrap';
import IntroText from '../../ui/IntroText';

interface ClaimMappingModalProps extends DataModificationModalProps {
  data?: ClaimMapping;
  claimSelectItems: SelectItem[];
  roleSelectItems: SelectItem[];
}

const ClaimMappingModal = (props: ClaimMappingModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(getNewClaimMapping());
  const [, { update: updateClaimMapping, add: addClaimMapping }] = useClaimMappingService();
  const getUserContext = useUserContext();
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(convertClaimMappingToForm(props.data ? props.data : getNewClaimMapping()));
  }, [props.data]);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleValidateAndSave = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || formData.claimId === -1 || formData.roleId === -1) {
      event.stopPropagation();
      setValidated(true);
    } else {
      handleSave();
    }
  };

  const handleSave = () => {
    const onSuccess = () => {
      props.handleSave();
      props.handleClose();
    };
    const dto = convertClaimMappingFormToDto(formData);
    dto.context = getUserContext()?.profile?.fedId || 'defaultContext';
    if (dto.id) {
      updateClaimMapping(dto, onSuccess);
    } else {
      dto.id = uuid();
      addClaimMapping([dto], onSuccess);
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
          <IntroText text={t('claim-mapping.claim-mapping-intro-text')}></IntroText>
          <GxfsTextInput
            name='name'
            label={t('claim-mapping.mapping-name')}
            valueChanged={onFormChanged}
            value={formData.name}
            required
          />

          <GxfsTextInput
            name='description'
            label={t('claim-mapping.description')}
            valueChanged={onFormChanged}
            value={formData.description}
            required
          />

          <GxfsSelect
            name='claimId'
            label={t('claim-mapping.select-claim')}
            valueChanged={onFormChanged}
            value={formData?.claimId}
            items={props.claimSelectItems}
            required
          />

          <GxfsSelect
            name='roleId'
            label={t('claim-mapping.select-role')}
            valueChanged={onFormChanged}
            value={formData?.roleId}
            items={props.roleSelectItems}
            required
          />
        </fieldset>
      </Form>
    </DataModificationModal>
  );
};

export default ClaimMappingModal;
