import React from 'react';
import Config from '../config/Config';
import Error from '../error/Error';
import { Route } from '../routes/routes';

export interface IAppContext {
  config: Config;
  routes: Route;
  setError: (error: Error) => void;
}

const AppContext = React.createContext<IAppContext>({} as IAppContext);

export default AppContext;
