import { useTranslation } from 'react-i18next';
import classes from './Footer.module.scss';
import logo from '../../assets/gfxs_logo.png';
import { Button, Col, Container, Image, Row, Stack } from 'react-bootstrap';
import React from 'react';
import { CookieInfo } from './Cookie-model';
import CookieInfoSection from './CookieInfoSection';

interface CookieSettingsProps {
  close: () => void;
}

const CookieSettings = (props: CookieSettingsProps) => {
  const { t } = useTranslation();

  const ESSENTIAL_COOKIE: CookieInfo = {
    name: 'Borlabs Cookie',
    provider: 'Owner of this website',
    purpose: 'Saves the visitors preferences selected in the Cookie Box of Borlabs Cookie.',
    cookieName: 'borlabs-cookie',
    expiry: '1 Year',
  };
  return (
    <>
      <Stack
        direction='vertical'
        className='mt-2 ml-2 mr-2'
        gap={2}
      >
        <div>
          <Stack direction='horizontal'>
            <Image
              className={classes['gaia-logo']}
              src={logo}
              alt='GXFS Logo'
            />
            <div className='gxfs-font-white-xxl-bold'>{t('cookie-settings.privacy-preference')}</div>
          </Stack>
        </div>
        <div className='gxfs-font-white-xxxs-normal'>{t('cookie-settings.privacy-preference-info')}</div>
        <div>
          <Button
            variant='dark'
            onClick={props.close}
          >
            {t('cookie-settings.accept-all')}
          </Button>
        </div>
        <div>
          <CookieInfoSection
            cookieType={t('cookie-settings.essential')}
            descripton={t('cookie-settings.essential-info')}
            info={ESSENTIAL_COOKIE}
          ></CookieInfoSection>
        </div>
      </Stack>
    </>
  );
};

export default CookieSettings;
