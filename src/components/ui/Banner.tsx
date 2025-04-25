import { Container } from 'react-bootstrap';
import { NoPaddingFlexColumnContainer } from './container';
import classes from './UI.module.scss';
import { BannerMode } from './UI-model';

interface BannerProps {
  title: string;
  mode?: BannerMode;
}

const Banner = (props: BannerProps) => {
  const mode = props.mode || BannerMode.DEFAULT;
  return (
    <NoPaddingFlexColumnContainer
      className={`${classes['banner-container']} ${classes[mode]}`}
      fluid
    >
      <Container>
        <h1>{props.title}</h1>
      </Container>
    </NoPaddingFlexColumnContainer>
  );
};

export default Banner;
