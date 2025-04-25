import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AppContext from '../../store/app-context';
import H2Text from '../ui/H2Text';
import classes from './Landing.module.scss';

const WelcomeText = () => {
  const { t } = useTranslation();
  const { routes } = React.useContext(AppContext);

  return (
    <Container className={classes['welcome-text-container']}>
      <H2Text
        title={t('welcome.title')}
        text={t('welcome.text', { registerLink: routes.imprint, loginLink: routes.settings })}
      />
    </Container>
  );
};

export default WelcomeText;
