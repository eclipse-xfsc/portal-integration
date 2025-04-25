import { useAuth } from 'oidc-react';
import React, { ReactElement, useContext, useState } from 'react';
import ErrorPage from '../components/error/ErrorPage';
import { RouteMapping } from '../routes/routeMappings';
import AppContext from '../store/app-context';
import useHeaderData, { MenuItem } from './useHeaderData';
import useRouteMappings from './useRouteMappings';
import useUserClaimsService from './useUserClaimsService';

type CheckPathFn = (routeMapping: RouteMapping) => ReactElement;

const useSecurityService = (): { menuItems: MenuItem[] | undefined; checkPath: CheckPathFn } => {
  const auth = useAuth();
  const headerData = useHeaderData();
  const [menuItems, setMenuItems] = useState(headerData);
  const { setError } = useContext(AppContext);
  const [userClaims, { load: loadUserClaims }] = useUserClaimsService<string[]>(setError);
  const routeMappings = useRouteMappings();

  React.useEffect(() => {
    if (auth.userData) {
      loadUserClaims();
    } else {
      setMenuItems(filterMenuItems(headerData));
    }
  }, [auth, loadUserClaims]);

  React.useEffect(() => {
    setMenuItems(filterMenuItems(headerData));
  }, [userClaims]);

  const isMenuItemAvailable = (menuItem: MenuItem): boolean => {
    const definedMapping = routeMappings.find((mapping) => mapping.path === menuItem.path);
    return (
      !definedMapping ||
      !definedMapping.requiredClaim ||
      (!!auth.userData && !!userClaims?.includes(definedMapping.requiredClaim))
    );
  };

  const filterMenuItems = (menuItems: MenuItem[] | undefined): MenuItem[] | undefined => {
    if (!menuItems) {
      return menuItems;
    }
    return menuItems
      .filter(isMenuItemAvailable)
      .map((menuItem) => {
        if (menuItem?.items && menuItem?.items?.length > 0) {
          menuItem.items = filterMenuItems(menuItem.items);
        }
        return menuItem;
      })
      .filter((menuItem) => menuItem.path || menuItem.items?.length !== 0);
  };

  const checkPath = (routeMapping: RouteMapping): ReactElement => {
    const requiredClaim = routeMapping.requiredClaim;
    return !requiredClaim || (auth.userData && userClaims?.includes(requiredClaim)) ? (
      routeMapping.element
    ) : (
      <ErrorPage requiredClaim={requiredClaim}></ErrorPage>
    );
  };

  return { menuItems, checkPath };
};

export default useSecurityService;
