import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import React, { PropsWithChildren } from 'react';
import classes from './UI.module.scss';
import { useTranslation } from 'react-i18next';

export interface OkModalProps {
  show: boolean;
  handleClose: () => void;
  handleExited?: () => void;
  title: string;
  dialogClass?: string;
}
const OkModal = (props: PropsWithChildren<OkModalProps>) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal
        centered
        show={props.show}
        onHide={props.handleClose}
        dialogClassName={classes[props.dialogClass || 'modal-default']}
        onExited={props.handleExited}
      >
        <Modal.Body>
          <h2 className='pb-4'>{props.title}</h2>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col
                xs={{ span: 6, offset: 3 }}
                sm={{ span: 4, offset: 4 }}
              >
                <Button
                  className={classes['modal-button']}
                  variant='secondary'
                  onClick={props.handleClose}
                >
                  {t('button.ok')}
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default OkModal;
