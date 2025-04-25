import { PropsWithChildren } from 'react';
import { ContainerProps } from 'react-bootstrap';
import { FlexColumnContainer } from './container';
import classes from './UI.module.scss';

export const Card = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = `${props.className ? props.className : ''} ${classes['card']}`;
  return (
    <FlexColumnContainer
      {...props}
      className={classNames}
    >
      {props.children}
    </FlexColumnContainer>
  );
};

export const CardNoPadding = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = `${props.className ? props.className : ''} ${classes['no-padding']}`;
  return (
    <Card
      {...props}
      className={classNames}
    >
      {props.children}
    </Card>
  );
};

export const CardContainer = (props: PropsWithChildren<ContainerProps>) => {
  return (
    <FlexColumnContainer>
      <Card {...props}>{props.children}</Card>
    </FlexColumnContainer>
  );
};
