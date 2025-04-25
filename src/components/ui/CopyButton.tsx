import IconButton from './IconButton';
import icon from '../../icons/copy_outline.svg';

interface CopyButtonProps {
  clickAction: () => void;
}

const CopyButton = (props: CopyButtonProps) => {
  return (
    <IconButton
      clickAction={props.clickAction}
      altText='copyIcon'
      icon={icon}
    />
  );
};
export default CopyButton;
