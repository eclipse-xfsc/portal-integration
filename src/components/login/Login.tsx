import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FirstTimeUserLite from '../first-time-user/FirstTimeUserLite';
import Banner from '../ui/Banner';
import { ContentContainer } from '../ui/container';
import classes from './Login.module.scss';

const Login = () => {
  const { t } = useTranslation();

  return (
    <ContentContainer className={classes['login-container']}>
      <Banner title={t('login.banner')} />

      <Container className={classes['login-container-login']}>
        <h2>{t('login.title')}</h2>
        <Button variant='secondary'>{t('login.btn-text')}</Button>
      </Container>

      <FirstTimeUserLite />
    </ContentContainer>
  );
};

export default Login;
