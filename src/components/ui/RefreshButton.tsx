import IconButton from './IconButton';
import refreshIcon from '../../icons/icon_refresh.svg';

interface RefreshButtonProps {
  clickAction: () => void;
}

const RefreshButton = (props: RefreshButtonProps) => {
  return (
    <IconButton
      clickAction={props.clickAction}
      altText='refreshIcon'
      icon={refreshIcon}
    />
  );
};
export default RefreshButton;
