import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../ui/Banner';
import { ContentContainer, FlexColumnContainer } from '../ui/container';
import { BannerMode } from '../ui/UI-model';
import AppContext from '../../store/app-context';
import { NotarizationRequest, NotarizationRequestItem } from './utils/Notarization-model';
import useNotarizationRequestService from '../../hooks/useNotarizationRequestService';
import { Button, Stack } from 'react-bootstrap';
import CredentialSettingsModal from './modal/CredentialSettingsModal';
import NotarizationRequestTable from './tables/NotarizationRequestTable';

const NotarizationAuthorization = () => {
  const { t } = useTranslation();
  const [showCredentialSettingsModal, setShowCredentialSettingsModal] = useState(false);
  const { setError } = useContext(AppContext);

  return (
    <>
      <ContentContainer className='row-gap-2'>
        <Banner
          mode={BannerMode.NOTARIZATION_REQUEST}
          title={t('notarization.banner')}
        />
        <FlexColumnContainer className='row-gap-2'>
          <h2>{t('notarization.notarization-request-overview')}</h2>
          <Stack direction='horizontal'>
            <Button
              variant='secondary'
              onClick={() => setShowCredentialSettingsModal(true)}
            >
              {t('notarization.participant-credential-settings')}
            </Button>
            <div className='ml-3 gxfs-font-dark-midsmall-bold-underline'>All credentials</div>
          </Stack>
          <CredentialSettingsModal
            show={showCredentialSettingsModal}
            title={t('notarization.participant-credentials')}
            handleClose={() => setShowCredentialSettingsModal(false)}
          />
          <NotarizationRequestTable />
        </FlexColumnContainer>
      </ContentContainer>
    </>
  );
};

export default NotarizationAuthorization;
