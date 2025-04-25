import { useTranslation } from 'react-i18next';

interface ContactItemHeaderProps {}

const ContactItemHeader = (props: ContactItemHeaderProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className='gxfs-font-dark-small-bold pl-1 mt-2 mb-2'>{t('service.contact')}</div>
    </>
  );
};

export default ContactItemHeader;
