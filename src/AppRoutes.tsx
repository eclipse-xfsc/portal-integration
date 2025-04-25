import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/App.scss';
import useRouteMappings from './hooks/useRouteMappings';
import useSecurityService from './hooks/useSecurityService';

const AppRoutes = () => {
  const { checkPath: checkPath } = useSecurityService();
  const routeMappings = useRouteMappings();

  return (
    <Routes>
      {routeMappings.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={checkPath(route)}
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
