import activeCheckboxIcon from '../../icons/checkbox_active.svg';
import inactiveCheckboxIcon from '../../icons/checkbox_standard.svg';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import classes from './UI.module.scss';

interface CheckboxProps {
  switchAction: (value: boolean) => void;
  value: boolean;
  className?: string;
}

const Checkbox = (props: CheckboxProps) => {
  const [active, setActive] = useState(props.value);
  const switchCheckbox = () => {
    setActive(!active);
    props.switchAction(active);
  };
  return (
    <>
      <Button
        className={`btn cancel-padding ${classes['table-action-button']} ${props.className}`}
        onClick={switchCheckbox}
      >
        <img
          src={active ? activeCheckboxIcon : inactiveCheckboxIcon}
          alt='checkboxIcon'
          className={`${classes['button-action-image']}`}
        />
      </Button>
    </>
  );
};
export default Checkbox;
