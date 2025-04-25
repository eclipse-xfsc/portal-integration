import { useKeycloak } from '@react-keycloak/web';
import { useContext, useEffect, useState } from 'react';
import { Col, Collapse, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import usePrincipalService from '../../hooks/usePrincipalService';
import AppContext from '../../store/app-context';
import Banner from '../ui/Banner';
import { CardContainer } from '../ui/card';
import { ContentContainer } from '../ui/container';
import H2Text from '../ui/H2Text';
import RoleButtonRow from '../ui/role/RoleButtonRow';
import RoleSelection from '../ui/role/RoleSelection';
import RoleUserData, { RoleUserDataMap } from '../ui/role/RoleUserData';
import classes from './RegisterPrincipal.module.scss';

import QRCode from 'qrcode.react';

const RegisterPrincipal = () => {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { config, setError, routes } = useContext(AppContext);
  const { initialized, keycloak } = useKeycloak();

  const [roles, setRoles] = useState<string[]>();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const [roleUserData, setRoleUserData] = useState<RoleUserDataMap>({});
  const [qrCodeData, { createCredential, clearQrCodeData }] = usePrincipalService(setError);
  const [showQrCode, setShowQrCode] = useState(false);

  const [descriptionKey, setDescriptionKey] = useState('register-principal.text');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // set the role claims from config or error if they doesn't exist
    initialized && keycloak && keycloak.authenticated && keycloak.tokenParsed?.realm_access?.roles
      ? setRoles(keycloak.tokenParsed.realm_access.roles.filter((item) => item.startsWith('gaia-x')))
      : setError({ message: 'claim error' });

    // set the role claims from config or error if they doesn't exist
    if (initialized && keycloak && keycloak.authenticated && keycloak.idTokenParsed && config.claimMappings) {
      const userData: RoleUserDataMap = {};

      for (const claimMappingKey in config.claimMappings) {
        userData[claimMappingKey] = keycloak.idTokenParsed[config.claimMappings[claimMappingKey]];
      }

      setRoleUserData(userData);

      console.log(userData);
    }
  }, [initialized, keycloak, setError, config.claimMappings]);

  useEffect(() => {
    if (qrCodeData) {
      setDescriptionKey('register-principal.text-qr-code');
      setShowQrCode(true);
    }
  }, [qrCodeData]);

  const handleCancel = () => {
    nav(routes.register);
  };

  const handleIssue = () => {
    createCredential(selectedRoles);
  };

  const handleBack = () => {
    setShowQrCode(false);
    setDescriptionKey('register-principal.text');
    setTimeout(clearQrCodeData, 300);
  };

  const handleOk = () => {
    nav(routes.root);
  };

  return (
    <ContentContainer className={classes['register-principal-container']}>
      <Banner title={t('register-principal.banner')} />

      <Container className={classes['register-principal-header']}>
        <H2Text
          title={t('register-principal.title')}
          text={t(descriptionKey, { userName: userName })}
        />
      </Container>
      {initialized && keycloak && roles && (
        <CardContainer className={classes['register-principal-card']}>
          <Collapse in={!showQrCode}>
            <div>
              <Row className={classes['register-principal-card-row']}>
                <Col sm='6'>
                  <RoleSelection
                    roles={roles}
                    selectedRoles={selectedRoles}
                    onSelect={setSelectedRoles}
                  />
                </Col>
                <Col>
                  <RoleUserData
                    value={roleUserData}
                    disabled
                  />
                </Col>
              </Row>
            </div>
          </Collapse>

          <Collapse in={showQrCode}>
            <div>
              <QRCode
                size={256}
                renderAs='svg'
                value={qrCodeData!}
              />
            </div>
          </Collapse>
          {!showQrCode && (
            <RoleButtonRow
              containerClassName={classes['role-line-container']}
              leftBtn={{ onClick: handleCancel, title: t('register-principal.cancel') }}
              rightBtn={{ onClick: handleIssue, title: t('register-principal.issue') }}
            />
          )}
          {showQrCode && (
            <RoleButtonRow
              containerClassName={classes['role-line-container']}
              leftBtn={{ onClick: handleBack, title: t('register-principal.back') }}
              rightBtn={{ onClick: handleOk, title: t('register-principal.ok') }}
            />
          )}
        </CardContainer>
      )}
    </ContentContainer>
  );
};

export default RegisterPrincipal;
