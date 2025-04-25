import { Button } from 'react-bootstrap';
import editIcon from '../../icons/icon-action-edit-default.svg';
import classes from './UI.module.scss';

interface EditButtonProps {
  editAction?: () => void;
  btnClassName?: string;
}

const EditButton = (props: EditButtonProps) => {
  return (
    <>
      <Button
        className={`cancel-padding ${classes['table-action-button']} ${props.btnClassName ? props.btnClassName : ''}`}
        onClick={props.editAction}
      >
        <img
          src={editIcon}
          alt='editIcon'
          className={`${classes['button-action-image']}`}
        />
      </Button>
    </>
  );
};
export default EditButton;
