import { useAuth } from 'oidc-react';
import { useContext } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useLogoutApi from '../../hooks/useLogoutApi';
import searchIcon from '../../icons/icon_search.svg';
import AppContext from '../../store/app-context';
import { NoPaddingFlexColumnContainer } from '../ui/container';
import classes from './Header.module.scss';
import SearchUserLoginState from './SearchUserLoginState';

const SearchLogin = () => {
  const auth = useAuth();
  const { setError } = useContext(AppContext);
  const { routes } = useContext(AppContext);
  const nav = useNavigate();
  const [logOut] = useLogoutApi(setError);

  const handleSignIn = () => {
    auth.signIn().catch(setError);
  };

  const handleSignOut = () => {
    const signOut: Promise<void> = auth.signOut();
    const logOutPromise: Promise<void> = logOut();
    Promise.all([signOut, logOutPromise])
      .then(() => {
        nav(routes.root);
        window.location.reload();
      })
      .catch(setError);
  };

  return (
    <NoPaddingFlexColumnContainer className={classes['search-login-container']}>
      <Container className={classes['login-container']}>
        <Image
          className={classes['search-icon']}
          src={searchIcon}
          alt='Search'
        />
        {!auth.userData && (
          <SearchUserLoginState
            text='Login'
            onClick={handleSignIn}
          />
        )}
        {auth.userData && (
          <SearchUserLoginState
            text='Logout'
            onClick={handleSignOut}
          />
        )}
      </Container>
    </NoPaddingFlexColumnContainer>
  );
};

export default SearchLogin;
