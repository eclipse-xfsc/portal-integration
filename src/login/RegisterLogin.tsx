import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak, { KeycloakError } from 'keycloak-js';
import { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import Placeholder from '../components/placeholder/Placeholder';
import AppContext from '../store/app-context';
import KeycloakLoginInterceptor from '../components/footer/KeycloakLoginInterceptor';

const RegisterLogin = (props: PropsWithChildren) => {
  const { config, setError } = useContext(AppContext);

  const [keycloak, setKeycloak] = useState<Keycloak>();

  const handleError = useCallback(
    (error: KeycloakError) => {
      setError({ message: error.error_description });
    },
    [setError]
  );

  useEffect(() => {
    if (config) {
      const kc = new Keycloak({
        clientId: config.oidc.internal.client_id,
        url: config.oidc.internal.authority,
        realm: config.oidc.internal.realm,
      });
      kc.onAuthError = handleError;
      setKeycloak(kc);
    }
  }, [config, handleError]);

  return (
    <>
      {keycloak ? (
        <ReactKeycloakProvider
          onEvent={(event, error) => console.log(event, error)}
          initOptions={{ onLoad: 'login-required' }}
          authClient={keycloak}
        >
          <KeycloakLoginInterceptor>{props.children}</KeycloakLoginInterceptor>
        </ReactKeycloakProvider>
      ) : (
        <Placeholder text=''></Placeholder>
      )}
    </>
  );
};

export default RegisterLogin;
