import React, { useState } from 'react';
import { Col, Container, Image, Offcanvas, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AppContext from '../../store/app-context';
import { NoPaddingFlexRowContainer } from '../ui/container';
import classes from './Footer.module.scss';
import ecoLogo from '../../assets/eco_Logo_red-1-1024x819.png';
import gefoerdertDurchLogo from '../../assets/Gefoerdert_Durch_768x784.png';
import CookieSettings from './CookieSettings';

const Footer = () => {
  const { t } = useTranslation();
  const { routes } = React.useContext(AppContext);
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  return (
    <NoPaddingFlexRowContainer
      fluid
      className={classes['footer-container']}
    >
      <Container className={classes['footer-inner-container']}>
        <Row className='pb-3 pt-3'>
          <Col
            sm={12}
            md={4}
          >
            <a
              href='https://www.eco.de/'
              target='_blank'
            >
              <Image
                className='center'
                src={ecoLogo}
                alt='Eco Logo'
                width={150}
                height={120}
              />
            </a>
          </Col>
          <Col
            sm={12}
            md={4}
          >
            <p className={classes['center-text']}>
              eco – Verband der Internetwirtschaft<br></br>Lichtstr. 43h<br></br>50825 Köln<br></br>Deutschland
              <br></br> <br></br>
              E-Mail:&nbsp;
              <a
                className={classes['non-underlined-link']}
                href='mailto:info@gxfs.de'
              >
                info@gxfs.de
              </a>
              <br></br>Tel: +49 221 700048 0
            </p>
          </Col>
          <Col
            sm={12}
            md={4}
            className='justify-content-md-center'
          >
            <a
              href='https://www.bmwk.de/Navigation/DE/Home/home.html'
              target='_blank'
            >
              <Image
                className='center'
                src={gefoerdertDurchLogo}
                alt='Gefoerdert Durch Logo'
                width={150}
                height={153}
              />
            </a>
          </Col>
        </Row>
        <Row className='justify-content-md-center pb-3 pt-3'>
          <Col
            md='auto'
            as={Link}
            to={routes.imprint}
          >
            {t('footer.imprint')}
          </Col>
          <Col
            md='auto'
            as={Link}
            to={routes.privacy}
          >
            {t('footer.privacy')}
          </Col>
          <Col md='auto'>
            <div
              className={classes['underlined-link']}
              onClick={() => setShowCookieSettings(true)}
            >
              <a className='col-md-auto'>{t('footer.settings')}</a>
            </div>
          </Col>
        </Row>
        <Row className={classes['copyright-section']}>
          <div className='d-flex justify-content-center'>
            <p className='pt-2 pb-2'>
              © 2023{' '}
              <a
                className={classes['non-underlined-link']}
                href='https://www.gxfs.eu'
                title='GXFS.de'
              >
                GXFS.eu
              </a>
              {'. '}
              {t('footer.rights')}
            </p>
          </div>
        </Row>
      </Container>
      <Offcanvas
        show={showCookieSettings}
        onHide={() => setShowCookieSettings(false)}
        className={classes['cookie-settings-container']}
        placement='bottom'
      >
        <Offcanvas.Body
          className={classes['cookie-settings-offcanvas']}
          id='cookie-settings-offcanvas'
        >
          <CookieSettings close={() => setShowCookieSettings(false)}></CookieSettings>
        </Offcanvas.Body>
      </Offcanvas>
    </NoPaddingFlexRowContainer>
  );
};

export default Footer;
