import { AuthProvider, UserManager } from 'oidc-react';
import React, { PropsWithChildren } from 'react';
import AppContext from '../store/app-context';
import { useNavigate } from 'react-router-dom';

const LoginInterceptor = (props: PropsWithChildren) => {
  const { config, routes } = React.useContext(AppContext);
  const [userManager, setUserManager] = React.useState<UserManager>();
  const nav = useNavigate();

  const onSignIn = () => {
    // workaround of the problem that on redirect authorization code is attached to URL
    nav(routes.root);
  };

  // on config change setting the usermanager for auth
  React.useEffect(() => {
    config &&
      config.oidc &&
      setUserManager(
        new UserManager({
          ...config.oidc.external,
          redirect_uri:
            !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:3000/'
              : config.oidc.external.redirectUri,
        })
      );
  }, [config]);

  return (
    <>
      {userManager && (
        <AuthProvider
          autoSignIn={false}
          userManager={userManager}
          onSignIn={onSignIn}
          loadUserInfo={false}
        >
          {props.children}
        </AuthProvider>
      )}
    </>
  );
};

export default LoginInterceptor;
