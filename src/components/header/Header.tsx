import { Container } from 'react-bootstrap';
import SideMenu from '../side-menu/SideMenu';
import classes from './Header.module.scss';
import HeaderLogo from './HeaderLogo';
import NavigationBar from './NavigationBar';
import SearchLogin from './SearchLogin';

const Header = () => {
  return (
    <>
      {
        <Container
          className={classes['header']}
          fluid
        >
          <HeaderLogo />
          <NavigationBar />
          <SideMenu />
          <SearchLogin />
        </Container>
      }
    </>
  );
};

export default Header;
