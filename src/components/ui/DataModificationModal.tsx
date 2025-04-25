import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import React, { PropsWithChildren } from 'react';
import classes from './UI.module.scss';

export interface DataModificationModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (event?: any) => void;
  handleExited?: () => void;
  title: string;
  saveLabel?: string;
  dialogClass?: string;
}
const DataModificationModal = (props: PropsWithChildren<DataModificationModalProps>) => {
  const saveLabel = props.saveLabel || 'Save';
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
              <Col>
                <Button
                  className={classes['modal-button']}
                  variant='secondary'
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  className={classes['modal-button']}
                  variant='secondary'
                  onClick={props.handleSave}
                  type='submit'
                >
                  {saveLabel}
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DataModificationModal;
