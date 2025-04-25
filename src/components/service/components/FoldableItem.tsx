import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import ToggleSwitch from '../../ui/ToggleSwitch';

interface FoldableItemProps {
  headerContent?: ReactElement;
  detailsContent?: ReactElement;
}

const FoldableItem = (props: FoldableItemProps) => {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleToggle = (active: boolean) => {
    setShowDetails(active);
  };

  return (
    <>
      <div className='white-top-border'>
        <Stack
          direction={'horizontal'}
          className='background-medium-light-grey'
        >
          {props.headerContent}
          <div className='ms-auto'>
            <ToggleSwitch
              className='mr-1 ml-1 ms-auto'
              switchAction={(active) => handleToggle(active)}
              value={true}
            />
          </div>
        </Stack>
        {showDetails && <div className='background-medium-light-grey'>{props.detailsContent}</div>}
      </div>
    </>
  );
};
export default FoldableItem;
