import { Service } from '../util/Service-model';
import GxfsText from '../../ui/GxfsText';
import { GxfsTextMode } from '../../util/common-model';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import GxfsTags from '../../ui/GxfsTags';
import FoldableItem from './FoldableItem';
import ContactItemHeader from './ContactItemHeader';
import ScreenshotsItemHeader from './ScreenshotsItemHeader';

interface ServiceItemDetailsProps {
  service: Service;
}

const ServiceItemDetails = (props: ServiceItemDetailsProps) => {
  const { t } = useTranslation();
  return (
    <div className='pt-2'>
      <div className='pl-1'>
        <GxfsText
          mode={GxfsTextMode.BOLD_SMALL}
          label={t('service.headline')}
          value={props.service.headline}
        ></GxfsText>
        <GxfsTags
          className='mt-2 mb-2'
          label={t('service.tags')}
          value={props.service.tags}
        ></GxfsTags>

        <Stack
          direction={'horizontal'}
          className='pb-2'
        >
          <GxfsText
            mode={GxfsTextMode.BOLD_SMALL}
            label={t('service.last-update')}
            value={props.service.lastUpdate}
          ></GxfsText>
          <GxfsText
            mode={GxfsTextMode.BOLD_SMALL}
            label={t('service.terms-of-use')}
            value={props.service.termsOfUse}
          ></GxfsText>
          <GxfsText
            mode={GxfsTextMode.BOLD_SMALL}
            label={t('service.security')}
            value={props.service.security}
          ></GxfsText>
          <GxfsText
            mode={GxfsTextMode.BOLD_SMALL}
            label={t('service.category')}
            value={props.service.category}
          ></GxfsText>
        </Stack>
      </div>
      <FoldableItem
        headerContent={<ContactItemHeader></ContactItemHeader>}
        detailsContent={<div>TBD</div>}
      ></FoldableItem>
      <FoldableItem
        headerContent={<ScreenshotsItemHeader></ScreenshotsItemHeader>}
        detailsContent={<div>TBD</div>}
      ></FoldableItem>
    </div>
  );
};
export default ServiceItemDetails;
