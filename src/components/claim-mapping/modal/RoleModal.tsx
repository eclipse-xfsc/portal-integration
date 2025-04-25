import {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataModificationModal, {DataModificationModalProps} from '../../ui/DataModificationModal';
import GxfsTextInput from '../../ui/GxfsTextInput';
import {onFormChangedFunction, submitForm} from '../../util/form-utils';
import {ClaimMappingRole} from '../utils/ClaimMapping-model';
import {getNewRole} from '../utils/ClaimMapping-util';
import AppContext from '../../../store/app-context';
import useRoleService from '../../../hooks/useRoleService';
import { convertRoleFormToDto } from '../utils/ClaimMapping-converter';
import IntroText from '../../ui/IntroText';
import {Form} from 'react-bootstrap';

interface RoleModalProps extends DataModificationModalProps {
  data?: ClaimMappingRole;
}

const RoleModal = (props: RoleModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(getNewRole());
  const { setError } = useContext(AppContext);
  const [, { update: updateRole, add: addRole }] = useRoleService<ClaimMappingRole[]>(setError);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(props.data ? props.data : getNewRole());
  }, [props.data]);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleSave = () => {
    const onSuccess = () => {
      props.handleSave();
      props.handleClose();
    };
    const dto = convertRoleFormToDto(formData);
    dto.id ? updateRole(dto, onSuccess) : addRole([dto], onSuccess);
  };

  const handleValidateAndSave = (event: any) => {
    console.log('validate');
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('invalid');
      event.stopPropagation();
      setValidated(true);
    } else {
      console.log('valid', formData, form);
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
          <IntroText text={t('claim-mapping.role-intro-text')}></IntroText>
          <GxfsTextInput
            name='name'
            label={t('claim-mapping.role-name')}
            valueChanged={onFormChanged}
            value={formData.name}
            required
          />
        </fieldset>
      </Form>
    </DataModificationModal>
  );
};

export default RoleModal;
