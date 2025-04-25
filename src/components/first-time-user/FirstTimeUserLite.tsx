import { useTranslation } from 'react-i18next';
import { CardContainer } from '../ui/card';
import { NoPaddingFlexColumnContainer } from '../ui/container';
import H2Text from '../ui/H2Text';
import classes from './Ftu.module.scss';
import FtuQrCode from './FtuQrCode';
import FtuStep from './FtuStep';

const FirstTimeUserLite = () => {
  const { t } = useTranslation();

  return (
    <CardContainer className={classes['lite']}>
      <H2Text
        title={t('first-time-user.title')}
        text={t('first-time-user.text0')}
      />

      <FtuStep text={t(`first-time-user.step${0}-text`)}>
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
    </CardContainer>
  );
};

export default FirstTimeUserLite;
