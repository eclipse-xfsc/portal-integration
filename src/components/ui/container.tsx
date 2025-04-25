import { PropsWithChildren } from 'react';
import { Container, ContainerProps, Fade } from 'react-bootstrap';
import Line from './Line';
import classes from './UI.module.scss';

export const FadeContainer = (props: PropsWithChildren<ContainerProps>) => {
  return (
    <Fade
      in
      appear
    >
      <Container {...props}>{props.children}</Container>
    </Fade>
  );
};

export const FlexColumnContainer = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = `${classes['flex-column']} ${props.className ? props.className : ''}`;

  return (
    <FadeContainer
      {...props}
      className={classNames}
    >
      {props.children}
    </FadeContainer>
  );
};

export const FlexRowContainer = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = `${classes['flex-row']}  ${props.className ? props.className : ''}`;

  return (
    <FadeContainer
      {...props}
      className={classNames}
    >
      {props.children}
    </FadeContainer>
  );
};

export const NoPaddingFlexColumnContainer = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = ` ${classes['no-padding']} ${props.className ? props.className : ''}`;

  return (
    <FlexColumnContainer
      {...props}
      className={classNames}
    >
      {props.children}
    </FlexColumnContainer>
  );
};

export const NoPaddingFlexRowContainer = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = ` ${classes['no-padding']} ${props.className ? props.className : ''}`;

  return (
    <FlexRowContainer
      {...props}
      className={classNames}
    >
      {props.children}
    </FlexRowContainer>
  );
};

export const ContentContainer = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = `${classes['fill']} ${classes['pb-3rem']} ${props.className ? props.className : ''}`;

  return (
    <MainContentContainer
      {...props}
      fluid
      className={classNames}
    >
      {props.children}
    </MainContentContainer>
  );
};

export const MainContentContainer = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = `${classes['fill']} ${props.className ? props.className : ''}`;

  return (
    <NoPaddingFlexColumnContainer
      {...props}
      fluid
      className={classNames}
    >
      {props.children}
    </NoPaddingFlexColumnContainer>
  );
};

export const LineContainer = (props: PropsWithChildren<ContainerProps>) => {
  const classNames = `${classes['fill']} ${props.className ? props.className : ''}`;

  return (
    <NoPaddingFlexColumnContainer
      {...props}
      className={classNames}
    >
      <Line />
      {props.children}
    </NoPaddingFlexColumnContainer>
  );
};
