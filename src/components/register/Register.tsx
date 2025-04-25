import { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../store/app-context';
import FirstTimeUser from '../first-time-user/FirstTimeUser';
import Banner from '../ui/Banner';
import { ContentContainer } from '../ui/container';
import classes from './Register.module.scss';

const Register = () => {
  const { t } = useTranslation();
  const { routes } = useContext(AppContext);
  const nav = useNavigate();

  const handleClick = () => {
    nav(routes.registerPrincipal);
  };

  return (
    <ContentContainer className={classes['register-container']}>
      <Banner title={t('register.banner')} />

      <Container className={classes['register-container-login']}>
        <h2>{t('register.title')}</h2>
        <Button
          variant='secondary'
          onClick={handleClick}
        >
          {t('register.btn-text')}
        </Button>
      </Container>

      <FirstTimeUser />
    </ContentContainer>
  );
};

export default Register;
