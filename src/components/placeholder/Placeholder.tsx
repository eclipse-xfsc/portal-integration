import { Container } from 'react-bootstrap';
import classes from './Placeholder.module.scss';

interface PlaceholderProps {
  text: string;
}

const Placeholder = ({ text }: PlaceholderProps) => {
  return <Container className={classes['landing-container']}>{text}</Container>;
};

export default Placeholder;
