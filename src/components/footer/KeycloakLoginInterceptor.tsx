import { useKeycloak } from '@react-keycloak/web';
import { PropsWithChildren } from 'react';
import Placeholder from '../placeholder/Placeholder';

const KeycloakLoginInterceptor = (props: PropsWithChildren) => {
  const { initialized, keycloak } = useKeycloak();

  return <>{initialized && keycloak.authenticated ? props.children : <Placeholder text='' />}</>;
};

export default KeycloakLoginInterceptor;
