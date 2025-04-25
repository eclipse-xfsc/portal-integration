import classes from './UI.module.scss';

interface LineProps {
  className?: string;
}

const Line = (props: LineProps) => {
  const classNames = `${props.className ? props.className : ''} ${classes.line} line`;

  return <div className={classNames} />;
};

export default Line;
