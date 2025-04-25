import { useTranslation } from 'react-i18next';
import GxfsPaginator from '../../ui/GxfsPaginator';
import GxfsSelect from '../../ui/GxfsSelect';
import { Stack } from 'react-bootstrap';
import { ServiceSearchForm } from '../util/Service-model';

interface PaginationSectionProps {
  searchForm: ServiceSearchForm;
  onFormChangedAction: (e: any) => void;
}

const PaginationSection = (props: PaginationSectionProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='background-grey pt-2 pb-2 pl-1'>
        <Stack direction='horizontal'>
          <GxfsPaginator></GxfsPaginator>
          <GxfsSelect
            skipLabel
            items={[]}
            value={props.searchForm.order}
            name='order'
            className='mr-2 ms-auto'
            defaultText={t('service.order')}
            valueChanged={props.onFormChangedAction}
          ></GxfsSelect>
        </Stack>
      </div>
    </>
  );
};

export default PaginationSection;
