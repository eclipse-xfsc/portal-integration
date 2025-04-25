import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {DataModificationModalProps} from '../../ui/DataModificationModal';
import GxfsTextInput from '../../ui/GxfsTextInput';
import {onFormChangedFunction} from '../../util/form-utils';
import {getNewDidWebKey} from '../utils/DidManagement-util';
import {DidWeb, DidWebKey} from '../utils/DidManagement-model';
import OkModal from '../../ui/OkModal';
import DidWebKeyTable from '../tables/DidWebKeyTable';
import {Button, Col, Form, Row} from 'react-bootstrap';
import classes from './../DidManagement.module.scss';
import useDidWebKeyService from '../../../hooks/useDidWebKeyService';
import IntroText from '../../ui/IntroText';

interface DidWebKeyModalProps extends DataModificationModalProps {
  data?: DidWeb;
}

const DidWebKeyModal = (props: DidWebKeyModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(getNewDidWebKey() as DidWebKey);
  const [, { rotate: rotateDidWebKey, add: addDidWebKey }] = useDidWebKeyService();
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleSave = () => {
    const onSuccess = () => {
      setFormData(getNewDidWebKey());
      props.handleSave();
      props.handleClose();
    };

    addDidWebKey(formData, props.data?.id, onSuccess);
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

  return (
    <OkModal
      show={props.show}
      handleClose={props.handleClose}
      handleExited={props.handleExited}
      title={props.title}
      dialogClass='modal-article-news'
    >
      <DidWebKeyTable
        didWeb={props.data}
        handleChange={handleSave}
      />
      <div className='gxfs-font-dark-medium pt-2 pb-2'>{t('did-management.create-new-key')}</div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleValidateAndSave}
        ref={formRef}
      >
        <fieldset>
          <IntroText text={t('did-management.did-web-key-intro-text')}></IntroText>
          <Row>
            <Col
              xs={6}
              sm={7}
              md={8}
            >
              <GxfsTextInput
                name='key'
                label={t('did-management.name')}
                valueChanged={onFormChanged}
                value={formData.key}
                required
              />
            </Col>
            <Col>
              <Button
                className={`btn-sm ${classes['create-new-button']}`}
                variant='dark'
                type='submit'
              >
                {t('did-management.create-new')}
              </Button>
            </Col>
          </Row>
        </fieldset>
      </Form>
    </OkModal>
  );
};

export default DidWebKeyModal;
