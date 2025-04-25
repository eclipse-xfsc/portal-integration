import { useContext, useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../store/app-context';
import Banner from '../ui/Banner';
import { CardContainer } from '../ui/card';
import { ContentContainer } from '../ui/container';
import H2Text from '../ui/H2Text';
import RoleButtonRow from '../ui/role/RoleButtonRow';
import RoleSelection from '../ui/role/RoleSelection';
import RoleUserData, { defaultMap, RoleUserDataMap } from '../ui/role/RoleUserData';
import classes from './Invitation.module.scss';

import useInvitationService from '../../hooks/useInvitationService';
import { BannerMode } from '../ui/UI-model';
import InvitationMessage from './InvitationMessage';
import { onFormChangedFunction, submitForm } from '../util/form-utils';

const Invitation = () => {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { routes } = useContext(AppContext);
  const [dataSent, setDataSent] = useState(false);

  const [roles, { getOptions: getRoles, sendMessage }] = useInvitationService();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const [formData, setFormData] = useState<RoleUserDataMap>({ ...defaultMap });
  const [msgDisabled, setMsgDisabled] = useState(true);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const handleCancel = () => {
    nav(routes.root);
  };

  const handleChange = () => {
    nav(routes.root);
  };

  const handleSend = () => {
    const onSuccess = () => {
      setDataSent(true);
    };

    sendMessage(
      {
        selectedRoleKeys: selectedRoles,
        templateKeyMap: {
          emailRecipient: formData.email,
          FirstName: formData.empFirstName,
          LastName: formData.empLastName,
          Email: formData.email,
          message: formData.message,
        },
      },
      onSuccess
    );
  };

  const handleValidateAndSave = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      handleSend();
    }
  };

  const handleSubmit = () => {
    submitForm(formRef);
  };

  const toggleMsgDisabled = () => {
    setMsgDisabled((state) => (state = !state));
  };

  return (
    <ContentContainer className={classes['invitation-container']}>
      <Banner
        mode={BannerMode.CLAIM_MAPPING}
        title={t('invitation.banner')}
      />

      <Container className={classes['invitation-header']}>
        <H2Text
          title={t('invitation.title')}
          text={t('invitation.description')}
        />
      </Container>
      {roles && (
        <CardContainer className={classes['invitation-card']}>
          <Row className={classes['invitation-card-row']}>
            <Col sm='6'>
              <RoleSelection
                roles={roles.roleKeys}
                selectedRoles={selectedRoles}
                onSelect={setSelectedRoles}
              />
            </Col>
            <Col>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleValidateAndSave}
                ref={formRef}
              >
                <fieldset>
                  <RoleUserData
                    value={formData}
                    onValueChanged={onFormChanged}
                    withEmail
                  />
                </fieldset>
              </Form>
            </Col>
          </Row>
          <InvitationMessage
            value={formData.message}
            valueChanged={onFormChanged}
            disabled={msgDisabled}
            onEditClick={toggleMsgDisabled}
            textAreaLabel={t('invitation.message-to-principal')}
          />

          <RoleButtonRow
            leftBtn={{ onClick: handleCancel, title: t('button.cancel') }}
            rightBtn={{ onClick: handleSubmit, title: t('button.send') }}
            sentBtnDisabled={dataSent}
          />
        </CardContainer>
      )}
    </ContentContainer>
  );
};

export default Invitation;
