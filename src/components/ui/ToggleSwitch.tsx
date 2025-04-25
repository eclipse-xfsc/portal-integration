import upToggleIcon from '../../icons/icon_up.svg';
import downToggleIcon from '../../icons/icon_down.svg';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import classes from './UI.module.scss';

interface ToggleSwitchProps {
  switchAction: (value: boolean) => void;
  value: boolean;
  className?: string;
}

const ToggleSwitch = (props: ToggleSwitchProps) => {
  const [active, setActive] = useState(props.value);
  const toggle = () => {
    setActive(!active);
    props.switchAction(active);
  };
  return (
    <>
      <Button
        className={`btn cancel-padding ${classes['table-action-button']} ${props.className}`}
        onClick={toggle}
      >
        <img
          src={active ? downToggleIcon : upToggleIcon}
          alt='checkboxIcon'
          className={`${classes['button-action-image']}`}
        />
      </Button>
    </>
  );
};
export default ToggleSwitch;
