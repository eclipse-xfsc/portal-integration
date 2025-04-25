import classes from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  open: boolean;
}

const BurgerMenu = ({ open }: BurgerMenuProps) => {
  return (
    <div className={`${classes['burger-menu']} ${open ? classes.open : ''}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerMenu;
