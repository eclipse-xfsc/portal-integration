import { useTranslation } from 'react-i18next';

interface ScreenshotsItemHeaderProps {}

const ScreenshotsItemHeader = (props: ScreenshotsItemHeaderProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className='gxfs-font-dark-small-bold pl-1 mt-2 mb-2'>{t('service.screenshots')}</div>
    </>
  );
};

export default ScreenshotsItemHeader;
