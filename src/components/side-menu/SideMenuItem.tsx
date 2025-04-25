import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MenuItem } from '../../hooks/useHeaderData';
import { NoPaddingFlexColumnContainer } from '../ui/container';
import classes from './SideMenu.module.scss';

interface SideMenuItemProps {
  menuItem: MenuItem;
  onClick: () => void;
  isBack?: boolean;
}

const SideMenuItem = ({ menuItem, onClick, isBack }: SideMenuItemProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive =
    location.pathname === menuItem.path ||
    (menuItem.items && menuItem.items.some((item) => location.pathname === item.path));

  return (
    <NoPaddingFlexColumnContainer
      className={classes['item-container']}
      onClick={onClick}
    >
      <Container className={!isBack ? classes['space-between'] : ''}>
        {/* indicator icon for menu level up */}
        {isBack && (
          <img
            alt='nav-icon'
            className={`${classes.arrow} ${classes.left} `}
          />
        )}

        <h2 className={isActive ? classes.active : ''}>
          <>{t(menuItem.title)}</>
        </h2>

        {/* indicator icon for menu level down */}
        {menuItem.items && menuItem.items.length > 0 && (
          <img
            alt='nav-icon'
            className={`${classes.arrow} ${classes.right}`}
          />
        )}
      </Container>
    </NoPaddingFlexColumnContainer>
  );
};

export default SideMenuItem;
