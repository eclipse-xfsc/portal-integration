import { useTranslation } from 'react-i18next';
import { CookieInfo } from './Cookie-model';
import classes from './Footer.module.scss';
import { Stack } from 'react-bootstrap';
import React, { useState } from 'react';
import AppContext from '../../store/app-context';

interface CookieInfoSectionProps {
  cookieType: string;
  descripton: string;
  info: CookieInfo;
}

const CookieInfoSection = (props: CookieInfoSectionProps) => {
  const { t } = useTranslation();
  const [showCookieInformation, setShowCookieInformation] = useState(false);
  const { routes } = React.useContext(AppContext);
  const toogleShowCookieInformation = () => {
    setShowCookieInformation(!showCookieInformation);
  };
  const imprintLink = (
    <a
      href={routes.imprint}
      className={classes['cookie-info-toggle-text']}
    >
      {t('footer.imprint')}
    </a>
  );
  return (
    <div className={classes['cookie-info-container']}>
      <Stack
        direction='vertical'
        className='ml-1 mr-1 mb-1'
        gap={2}
      >
        <div className={classes['cookie-info-container']}>{props.cookieType} (1)</div>
        <div className={classes['cookie-info-description']}>{props.descripton}</div>
        <div className='mb-1'>
          <div
            className={classes['cookie-info-toggle-text']}
            onClick={toogleShowCookieInformation}
          >
            <a className={classes['cookie-info-toggle-text']}>
              {showCookieInformation ? t('cookie-settings.hide-cookie-info') : t('cookie-settings.show-cookie-info')}
            </a>
          </div>
        </div>
        {showCookieInformation && (
          <div className={classes['cookie-info-description']}>
            <table className={classes['cookie-info-table']}>
              <tbody>
                <tr>
                  <td>{t('cookie-settings.name')}</td>
                  <td>{props.info.name}</td>
                </tr>
                <tr>
                  <td>{t('cookie-settings.provider')}</td>
                  <td>
                    {props.info.provider} {imprintLink}
                  </td>
                </tr>
                <tr>
                  <td>{t('cookie-settings.purpose')}</td>
                  <td>{props.info.purpose}</td>
                </tr>
                <tr>
                  <td>{t('cookie-settings.cookie-name')}</td>
                  <td>{props.info.cookieName}</td>
                </tr>
                <tr>
                  <td>{t('cookie-settings.expiry')}</td>
                  <td>{props.info.expiry}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default CookieInfoSection;
