import deleteIcon from '../../icons/icon-action-remove-default.svg';
import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './UI.module.scss';

interface DeleteButtonProps {
  deleteAction: () => void;
}

const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <>
      <Button
        className={`cancel-padding ${classes['table-action-button']}`}
        onClick={props.deleteAction}
      >
        <img
          src={deleteIcon}
          alt='deleteIcon'
          className={`${classes['button-action-image']}`}
        />
      </Button>
    </>
  );
};
export default DeleteButton;
