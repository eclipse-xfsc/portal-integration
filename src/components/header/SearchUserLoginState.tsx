import { useAuth } from 'oidc-react';
import { Image } from 'react-bootstrap';
import userIcon from '../../icons/icon_user.svg';

import classes from './Header.module.scss';

interface ISearchUserLoginState {
  text: string;
  onClick: () => void;
}

const SearchUserLoginState = ({ text, onClick }: ISearchUserLoginState) => {
  const auth = useAuth();
  return (
    <>
      <h2
        className={` ${classes.pointer}`}
        onClick={onClick}
      >
        {auth?.userData ? auth?.userData?.profile?.preferred_username : text}
      </h2>

      <Image
        className={classes.pointer}
        src={userIcon}
        alt='User'
        onClick={onClick}
      />
    </>
  );
};

export default SearchUserLoginState;
