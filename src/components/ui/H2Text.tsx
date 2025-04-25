import { PropsWithChildren } from 'react';
import { NoPaddingFlexColumnContainer } from './container';
import classes from './UI.module.scss';

export interface H2TextProps {
  title: string;
  text: string;
}

const H2Text = (props: PropsWithChildren<H2TextProps>) => {
  return (
    <NoPaddingFlexColumnContainer className={classes['h2-text-container']}>
      <h2>{props.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.text }} />
      {props.children}
    </NoPaddingFlexColumnContainer>
  );
};

export default H2Text;
