import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../ui/Banner';
import { ContentContainer, FlexColumnContainer } from '../ui/container';
import { BannerMode } from '../ui/UI-model';
import uiClasses from '../ui/UI.module.scss';
import AppContext from '../../store/app-context';
import { Button, Stack } from 'react-bootstrap';
import NotarizationRequestModal from './modal/NotarizationRequestModal';

const NotarizationRequest = () => {
  const { t } = useTranslation();
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  return (
    <>
      <ContentContainer className='row-gap-2'>
        <Banner
          mode={BannerMode.NOTARIZATION_REQUEST}
          title={t('notarization.banner')}
        />
        <FlexColumnContainer className='row-gap-1'>
          <h2>{t('notarization.headline')}</h2>
          <h3 className='pt-2'>{t('notarization.select-from-notary-list')}</h3>
          <Stack
            direction='horizontal'
            gap={2}
          >
            <Button
              className={uiClasses['grey-button']}
              onClick={() => setShowNewRequestModal(true)}
            >
              {t('notarization.internal')}
            </Button>
            <Button className={uiClasses['grey-button']}>{t('notarization.second-point')}</Button>
          </Stack>
          <NotarizationRequestModal
            show={showNewRequestModal}
            title={t('notarization.notarization-request')}
            handleClose={() => setShowNewRequestModal(false)}
          />
        </FlexColumnContainer>
      </ContentContainer>
    </>
  );
};

export default NotarizationRequest;
