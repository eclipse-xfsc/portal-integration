import { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItem } from '../../hooks/useHeaderData';
import AppContext from '../../store/app-context';
import classes from './Header.module.scss';

export interface GxfsNavDropdownProps {
  menuItem: MenuItem;
}

const GxfsNavDropdown = ({ menuItem }: GxfsNavDropdownProps) => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const location = useLocation();
  const { routes } = useContext(AppContext);

  const handleNavigation = (path?: string) => {
    if (path && !path.startsWith('#')) Object.values(routes).includes(path) ? nav(path) : window.open(path, '_blank');
  };

  return (
    <>
      {menuItem.items ? (
        <>
          <NavDropdown
            title={t(menuItem.title)}
            key={menuItem.id}
            id={menuItem.id}
            show
            renderMenuOnMount
          >
            {menuItem.items.map((item) => {
              return (
                <NavDropdown.Item
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  active={location.pathname === item.path}
                >
                  {t(item.title)}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </>
      ) : (
        <h2
          className={classes.pointer}
          key={menuItem.id}
          onClick={() => handleNavigation(menuItem.path)}
        >
          {menuItem.title}
        </h2>
      )}
    </>
  );
};

export default GxfsNavDropdown;
