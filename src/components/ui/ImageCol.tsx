import { Container, Image } from 'react-bootstrap';
import H2Text, { H2TextProps } from './H2Text';
import classes from './UI.module.scss';

interface ImageColProps extends H2TextProps {
  src: string;
}

const ImageCol = (props: ImageColProps) => {
  return (
    <>
      <Container as={Image} className={classes['image-col-image']} src={props.src} />
      <H2Text {...props} />
    </>
  );
};

export default ImageCol;
