import { useTranslation } from 'react-i18next';
import { ContentContainer } from '../ui/container';
import classes from '../did-management/DidManagement.module.scss';
import Banner from '../ui/Banner';
import { BannerMode } from '../ui/UI-model';

interface ErrorPageProps {
  requiredClaim?: string;
}

const ErrorPage = (props: ErrorPageProps) => {
  const { t } = useTranslation();
  return (
    <>
      <ContentContainer className={classes['row-gab-2rem']}>
        <Banner
          mode={BannerMode.DID_MANAGEMENT}
          title={t('error.no-permission-claim-missing', { requiredClaim: props.requiredClaim })}
        />
      </ContentContainer>
    </>
  );
};

export default ErrorPage;
