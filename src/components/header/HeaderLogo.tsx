import classes from './Header.module.scss';
import logo from '../../icons/GFXS_DE_Logo.png';
import homeIcon from '../../icons/icon_home.svg';
import { Image } from 'react-bootstrap';
import React from 'react';
import AppContext from '../../store/app-context';
import { useNavigate } from 'react-router-dom';

const HeaderLogo = () => {
  const { routes } = React.useContext(AppContext);
  const nav = useNavigate();

  const navHome = () => {
    nav(routes.root);
  };
  return (
    <>
      <Image className={classes['gaia-logo']} src={logo} alt='Logo' onClick={navHome} />
      <Image className={classes['home-icon']} src={homeIcon} alt='Home' onClick={navHome} />
    </>
  );
};

export default HeaderLogo;
