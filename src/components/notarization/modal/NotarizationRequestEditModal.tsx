import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../store/app-context';
import { onFormChangedFunction } from '../../util/form-utils';
import { getEditedNotarizationRequest } from '../utils/Notarization-util';
import useNotarizationRequestService from '../../../hooks/useNotarizationRequestService';
import { NotarizationRequest } from '../utils/Notarization-model';
import { CREDENTIAL_TYPES, WALLETS } from '../utils/Notarization-data';
import GxfsText from '../../ui/GxfsText';
import GxfsTextarea from '../../ui/GxfsTextarea';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import uiClasses from '../../ui/UI.module.scss';
import { GxfsTextMode } from '../../util/common-model';
import GxfsDocumentLink from '../../ui/GxfsDocumentLink';
import IntroText from '../../ui/IntroText';

interface NotarizationRequestEditProps {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  title: string;
  data: NotarizationRequest;
}

const NotarizationRequestEditModal = (props: NotarizationRequestEditProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [formData, setFormData] = useState(getEditedNotarizationRequest());
  const [, { update: updateNotarizationRequest }] = useNotarizationRequestService<NotarizationRequest[]>(setError);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleSave = (approved: boolean) => {
    props.data.comment = formData.comment;
    props.data.approved = approved;
    updateNotarizationRequest(props.data, close);
  };

  const close = () => {
    setFormData(getEditedNotarizationRequest());
    props.handleClose();
  };

  return (
    <Modal
      centered
      show={props.show}
      onHide={close}
      dialogClassName={uiClasses['modal-large']}
    >
      <Modal.Body>
        <h2 className='pb-4'>{props.title}</h2>
        <IntroText text={t('notarization.notarization-request-edit-intro-text')}></IntroText>
        <GxfsText
          className='mb-1'
          label={t('notarization.personal-data')}
          value={props.data?.personalData}
        />
        <GxfsText
          className='mb-2'
          label={t('notarization.request-name')}
          value={props.data?.name}
          mode={GxfsTextMode.MEDIUM}
        />
        <GxfsText
          className='mb-3'
          label={t('notarization.credential')}
          value={CREDENTIAL_TYPES.find((item) => item.id === props.data?.type)?.value}
          mode={GxfsTextMode.MEDIUM}
        />
        <GxfsText
          className='mb-4'
          label={t('notarization.receiving-wallet')}
          value={WALLETS.find((item) => item.id === props.data?.wallet)?.value}
          mode={GxfsTextMode.MEDIUM}
        />
        <GxfsDocumentLink
          className='mb-1'
          label={t('notarization.document')}
          text={props.data?.filename}
          link={props.data?.fileUrl || 'https://www.logo.wine/a/logo/T-Systems/T-Systems-Logo.wine.svg'}
        ></GxfsDocumentLink>
        <GxfsTextarea
          name='comment'
          label={t('notarization.comment')}
          valueChanged={onFormChanged}
          value={formData.comment}
          mode={GxfsTextMode.MEDIUM}
        />
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col>
              <Button
                className={uiClasses['modal-button']}
                variant='secondary'
                onClick={close}
              >
                {t('button.cancel')}
              </Button>
            </Col>
            <Col>
              <Button
                className={uiClasses['modal-button']}
                variant='danger'
                onClick={() => handleSave(false)}
              >
                {t('button.decline')}
              </Button>
            </Col>
            <Col>
              <Button
                className={uiClasses['modal-button']}
                variant='success'
                onClick={() => handleSave(true)}
              >
                {t('button.approve')}
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default NotarizationRequestEditModal;
