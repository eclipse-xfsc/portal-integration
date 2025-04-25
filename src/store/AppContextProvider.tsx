import React, { useState } from 'react';
import Error from '../error/Error';
import ErrorModal from '../error/ErrorModal';
import useGetConfig from '../hooks/useGetConfig';
import routes from '../routes/routes';
import AppContext, { IAppContext } from './app-context';

const AppContextProvider = (props: any) => {
  const [error, setError] = useState<Error>();
  const [showError, setShowError] = useState(false);
  const config = useGetConfig(setError);

  const [ctx, setCtx] = useState<IAppContext>({ routes: routes, setError: setError } as IAppContext);

  React.useEffect(() => {
    config && setCtx((state) => (state = { ...state, config: config } as IAppContext));
  }, [config]);

  React.useEffect(() => {
    error && setShowError(true);
  }, [error]);

  const handleHide = () => {
    setShowError(false);
  };

  const handleExited = () => {
    setError(undefined);
  };

  // React.useEffect(() => {
  //   config && setCtx((state) => (state = { ...state, config: { oidc: config } } as IAppContext));
  // }, [config]);

  return (
    <>
      {ctx && (
        <AppContext.Provider value={ctx}>
          {props.children}
          <ErrorModal
            error={error}
            show={showError}
            onHide={handleHide}
            onExited={handleExited}
          />
        </AppContext.Provider>
      )}
    </>
  );
};

export default AppContextProvider;
