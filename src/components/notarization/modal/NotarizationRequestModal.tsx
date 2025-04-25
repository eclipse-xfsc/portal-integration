import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../store/app-context';
import DataModificationModal from '../../ui/DataModificationModal';
import GxfsTextInput from '../../ui/GxfsTextInput';
import { onFormChangedFunction, submitForm } from '../../util/form-utils';
import { getNewNotarizationRequest } from '../utils/Notarization-util';
import useNotarizationRequestService from '../../../hooks/useNotarizationRequestService';
import { NotarizationRequest } from '../utils/Notarization-model';
import { Button, Col, Form, Row } from 'react-bootstrap';
import classes from '../../notarization/Notarization.module.scss';
import GxfsSelect from '../../ui/GxfsSelect';
import { CREDENTIAL_TYPES, WALLETS } from '../utils/Notarization-data';
import GxfsText from '../../ui/GxfsText';
import IntroText from '../../ui/IntroText';

interface NotarizationRequestProps {
  show: boolean;
  handleClose: () => void;
  title: string;
}

const NotarizationRequestModal = (props: NotarizationRequestProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [formData, setFormData] = useState(getNewNotarizationRequest());
  const [startSessionActive, setStartSessionActive] = useState(false);
  const [, { add: addNotarizationRequest }] = useNotarizationRequestService<NotarizationRequest[]>(setError);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleSave = () => {
    const onSuccess = () => {
      props.handleClose();
    };
    addNotarizationRequest(formData, onSuccess);
  };
  const handleValidateAndSave = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      handleSave();
    }
  };
  const startSession = () => {
    // TODO Wait for response regarding what should happen on button click?
    console.log('todo: start session');
  };
  const close = () => {
    setFormData(getNewNotarizationRequest());
    props.handleClose();
  };

  return (
    <DataModificationModal
      show={props.show}
      handleClose={close}
      handleSave={() => submitForm(formRef)}
      title={props.title}
      dialogClass='modal-article-news'
      saveLabel={t('notarization.request')}
    >
      <Form
        noValidate
        validated={validated}
        onSubmit={handleValidateAndSave}
        ref={formRef}
      >
        <fieldset>
          <IntroText text={t('notarization.notarization-request-intro-text')}></IntroText>
          <GxfsText
            label={t('notarization.personal-data')}
            value='Heiner Muller, 24.03.1971, Adresse'
          />
          <GxfsTextInput
            name='name'
            label={t('notarization.request-name')}
            valueChanged={onFormChanged}
            value={formData.name}
            required
          />
          <GxfsSelect
            name='wallet'
            label={t('notarization.receiving-wallet')}
            valueChanged={onFormChanged}
            value={formData.wallet}
            items={WALLETS}
            required
          />
          <GxfsTextInput
            name='filename'
            label={t('notarization.upload-document')}
            valueChanged={onFormChanged}
            value={formData.filename}
            required
          />
          <Row>
            <Col
              xs={6}
              sm={7}
              md={8}
            >
              <GxfsSelect
                name='type'
                label={t('notarization.credential-type')}
                valueChanged={onFormChanged}
                value={formData.type}
                items={CREDENTIAL_TYPES}
                required
              />
            </Col>
            <Col>
              <Button
                className={`btn-sm ${classes['start-session-button']}`}
                variant='dark'
                disabled={!(formData?.type && formData.type > 0)}
                onClick={startSession}
              >
                {t('notarization.start-session')}
              </Button>
            </Col>
          </Row>
        </fieldset>
      </Form>
    </DataModificationModal>
  );
};

export default NotarizationRequestModal;
