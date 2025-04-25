import { Button, Collapse, Stack } from 'react-bootstrap';
import BurgerMenu from '../ui/burger/BurgerMenu';
import classes from './SideMenu.module.scss';

interface MenuButtonProps {
  onClick: () => void;
  open: boolean;
}

const MenuButton = ({ open, onClick }: MenuButtonProps) => {
  return (
    <Button
      className={`${classes['menu-btn']} small-and-xs-only btn cancel-padding`}
      onClick={onClick}
    >
      <Stack
        className='small-and-xs-only'
        direction='horizontal'
        gap={2}
      >
        <BurgerMenu open={open} />
        <Collapse
          dimension={'width'}
          appear
          in={!open}
        >
          <span className='dropdown'>Menu</span>
        </Collapse>
      </Stack>
    </Button>
  );
};

export default MenuButton;
