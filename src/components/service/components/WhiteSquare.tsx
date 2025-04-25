import classes from '../Service.module.scss';

interface WhiteSquareProps {}

const WhiteSquare = (props: WhiteSquareProps) => {
  return (
    <>
      <div className={classes['white-square']}></div>
    </>
  );
};
export default WhiteSquare;
