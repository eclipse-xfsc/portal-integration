import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import Error from './Error';
import InternalErrorData from './Error';

interface ErrorModalProps {
  show: boolean;
  onExited: () => void;
  onHide: () => void;
  error?: Error;
}

const ErrorModal = (props: ErrorModalProps) => {
  const error = props.error;
  const status = error?.response?.status;
  const responseData = error?.response?.data;
  const getSpecificErrorMessage = () => {
    if (status === 409) {
      const technicalMessage = (responseData as InternalErrorData)?.error?.message;
      return ` Reason: ${technicalMessage}`;
    } else {
      return '';
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      onExited={props.onExited}
    >
      <ModalHeader closeButton>Error</ModalHeader>
      <ModalBody>
        {status === 400
          ? (responseData as string)
          : 'Something went wrong!' + error?.message + getSpecificErrorMessage()}
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default ErrorModal;
