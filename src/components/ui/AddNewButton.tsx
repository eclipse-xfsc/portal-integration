import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import addIcon from '../../icons/icon_add_button_square.svg';
import { NoPaddingFlexRowContainer } from './container';
import classes from './UI.module.scss';

interface AddNewButtonProps {
  addAction: () => void;
}
const AddNewButton = (props: AddNewButtonProps) => {
  const { t } = useTranslation();
  return (
    <>
      <NoPaddingFlexRowContainer className={classes['table-buttons-container']}>
        <span
          className={`gxfs-font-dark-medium`}
          onClick={props.addAction}
        >
          {t('button.add-new')}
        </span>
        <Button
          className={`${classes['button-add']}`}
          onClick={props.addAction}
        >
          <img
            src={addIcon}
            alt='addIcon'
          />
        </Button>
      </NoPaddingFlexRowContainer>
    </>
  );
};
export default AddNewButton;
