import { useContext, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../../hooks/useHeaderData';
import AppContext from '../../store/app-context';
import MenuButton from './MenuButton';
import SideMenuItem from './SideMenuItem';
import useSecurityService from '../../hooks/useSecurityService';
import classes from './SideMenu.module.scss';

const SideMenu = () => {
  const { menuItems: headerData } = useSecurityService();
  const nav = useNavigate();
  const { routes } = useContext(AppContext);

  const [show, setShow] = useState(false);
  const [subItem, setSubItem] = useState<MenuItem>();

  const handleMenuBtnClick = () => {
    // safely inverting show state
    setShow((state) => (state = !state));
  };

  const handleMenuItemClick = (item: MenuItem) => {
    // item has subItems --> level down
    if (item.items && item.items.length > 0) {
      setSubItem(item);
      return;
    }

    // subItem is set and its title equal to clicked one --> level up
    if (subItem && item.id === subItem.id) {
      setSubItem(undefined);
      return;
    }

    // navigate
    if (item.path && !item.path.startsWith('#')) {
      Object.values(routes).includes(item.path) ? nav(item.path) : window.open(item.path, '_blank');
      setShow(false);
    }
  };

  const getMenuData = (data: MenuItem[]) => {
    return [
      // add home navigation
      {
        title: 'header.home',
        id: 'home',
        path: routes.root,
      },
      // and then all the other items
      ...data,
    ];
  };

  const getSubMenuData = (data: MenuItem) => {
    return {
      // all the data from submenu
      ...data,
      // but with adjusted item list --> for level up menu navigation
      items: [
        {
          ...data,
          items: undefined,
        },
        ...data.items!,
      ],
    };
  };

  const handleExited = () => {
    setSubItem(undefined);
  };

  const handleHide = () => {
    setShow(false);
  };

  return (
    <>
      {headerData && (
        <>
          <MenuButton
            open={show}
            onClick={handleMenuBtnClick}
          />
          <Offcanvas
            responsive='md'
            show={show}
            onHide={handleHide}
            onExited={handleExited}
            className={classes['side-menu']}
          >
            <Offcanvas.Body className={classes['side-menu-body']}>
              {!subItem &&
                getMenuData(headerData).map((item) => {
                  return (
                    <SideMenuItem
                      key={item.id}
                      menuItem={item}
                      onClick={() => handleMenuItemClick(item)}
                    />
                  );
                })}
              {subItem &&
                subItem.items &&
                getSubMenuData(subItem).items.map((item) => {
                  return (
                    <SideMenuItem
                      key={item.id}
                      menuItem={item}
                      isBack={subItem.id === item.id}
                      onClick={() => handleMenuItemClick(item)}
                    />
                  );
                })}
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </>
  );
};

export default SideMenu;
