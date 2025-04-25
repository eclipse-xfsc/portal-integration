import { Button } from 'react-bootstrap';

import classes from './UI.module.scss';

interface IconButtonProps {
  clickAction: () => void;
  altText: string;
  icon: string;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <>
      <Button
        className={`cancel-padding ${classes['table-action-button']}`}
        onClick={props.clickAction}
      >
        <img
          src={props.icon}
          alt={props.altText}
          className={`${classes['button-action-image']}`}
        />
      </Button>
    </>
  );
};
export default IconButton;
