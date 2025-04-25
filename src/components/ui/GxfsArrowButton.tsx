import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import classes from './UI.module.scss';
import arrowIcon from '../../icons/icon_down_dark.svg';

export enum GxfsArrowDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface GxfsArrowButtonProps {
  direction: GxfsArrowDirection;
  clickAction: () => void;
  className?: string;
}

const GxfsArrowButton = (props: GxfsArrowButtonProps) => {
  const { t } = useTranslation();
  const direction = props.direction || GxfsArrowDirection.LEFT;
  const rotationClass = direction === GxfsArrowDirection.LEFT ? 'rotate-left' : 'rotate-right';
  return (
    <>
      <Button
        className={`cancel-padding ${classes['white-action-button']} ${props.className}`}
        onClick={props.clickAction}
      >
        <img
          src={arrowIcon}
          alt='arrowIcon'
          className={`${classes['button-action-image']} ${rotationClass}`}
        />
      </Button>
    </>
  );
};

export default GxfsArrowButton;
