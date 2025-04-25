import { useTranslation } from 'react-i18next';
import { Service } from '../util/Service-model';
import WhiteSquare from './WhiteSquare';
import GxfsText from '../../ui/GxfsText';
import { GxfsTextMode } from '../../util/common-model';

interface ServiceItemHeaderProps {
  service: Service;
}

const ServiceItemHeader = (props: ServiceItemHeaderProps) => {
  const { t } = useTranslation();
  return (
    <>
      <WhiteSquare></WhiteSquare>
      <GxfsText
        mode={GxfsTextMode.FIELD_BOLD_MIDSMALL}
        className='mt-1'
        label={props.service.name}
        value=''
      ></GxfsText>
      <GxfsText
        mode={GxfsTextMode.FIELD_MIDSMALL}
        className='mt-1'
        label={t('service.stack')}
        value={props.service.stack}
      ></GxfsText>
      <GxfsText
        mode={GxfsTextMode.FIELD_MIDSMALL}
        className='mt-1'
        label={t('service.security')}
        value={props.service.security}
      ></GxfsText>
      <GxfsText
        mode={GxfsTextMode.FIELD_MIDSMALL}
        className='mt-1'
        label={t('service.location')}
        value={props.service.location}
      ></GxfsText>
      <div className='ms-auto'>{t('service.purchase')}</div>
    </>
  );
};

export default ServiceItemHeader;
