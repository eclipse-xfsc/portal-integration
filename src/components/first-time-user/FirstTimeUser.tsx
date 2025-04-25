import React from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../store/app-context';
import { CardContainer } from '../ui/card';
import { NoPaddingFlexColumnContainer } from '../ui/container';
import H2Text from '../ui/H2Text';
import classes from './Ftu.module.scss';
import FtuQrCode from './FtuQrCode';
import FtuStep from './FtuStep';

const FirstTimeUser = () => {
  const { t } = useTranslation();
  const { routes } = React.useContext(AppContext);

  return (
    <CardContainer>
      <H2Text
        title={t('first-time-user.title')}
        text={t('first-time-user.text1')}
      />

      <FtuStep
        step={1}
        text={t(`first-time-user.step${0}-text`)}
      >
        <NoPaddingFlexColumnContainer className={classes['ftu-content-qr-code-container']}>
          <FtuQrCode
            title={t('first-time-user.google')}
            qrcodeData='www.google.com'
          />
          <FtuQrCode
            title={t('first-time-user.apple')}
            qrcodeData='www.apple.com'
          />
        </NoPaddingFlexColumnContainer>
      </FtuStep>
      <FtuStep
        step={2}
        text={t(`first-time-user.step${1}-text`, { registerLink: routes.register })}
      />
      <FtuStep
        step={3}
        text={t(`first-time-user.step${2}-text`)}
      />
      <FtuStep
        step={4}
        text={t(`first-time-user.step${3}-text`)}
      />
    </CardContainer>
  );
};

export default FirstTimeUser;
