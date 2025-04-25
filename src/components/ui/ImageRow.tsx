import { Col, Image, Row } from 'react-bootstrap';
import H2Text, { H2TextProps } from './H2Text';
import classes from './UI.module.scss';

interface ImageRowProps extends H2TextProps {
  src: string;
  textAtFirst?: boolean;
}

const ImageRow = (props: ImageRowProps) => {
  const img = <Col as={Image} src={props.src} md='6' />;

  return (
    <Row className={`${classes['image-row']}`}>
      {!props.textAtFirst && img}
      <Col md='6'>
        <H2Text {...props} />
      </Col>
      {props.textAtFirst && img}
    </Row>
  );
};

export default ImageRow;
