import { PropsWithChildren } from 'react';
import { LineContainer, NoPaddingFlexColumnContainer } from '../ui/container';
import classes from './Ftu.module.scss';

// ftu --> first-time-user
interface FtuStepProps {
  step?: number;
  text: string;
}

// ftu --> first-time-user
const FtuStep = (props: PropsWithChildren<FtuStepProps>) => {
  return (
    <LineContainer>
      <NoPaddingFlexColumnContainer className={classes['ftu-step-container']}>
        {props.step && <span>{`0${props.step}`}</span>}
        <NoPaddingFlexColumnContainer className={classes['ftu-step-content-container']}>
          <p dangerouslySetInnerHTML={{ __html: props.text }} />
          {props.children}
        </NoPaddingFlexColumnContainer>
      </NoPaddingFlexColumnContainer>
    </LineContainer>
  );
};

export default FtuStep;
