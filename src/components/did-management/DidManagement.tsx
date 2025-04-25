import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../ui/Banner';
import { ContentContainer, FlexColumnContainer } from '../ui/container';
import { BannerMode } from '../ui/UI-model';
import classes from './DidManagement.module.scss';

import useArticleService from '../../hooks/useArticleService';
import { ArticleCategory } from '../article-news/utils/ArticleNews-model';
import AppContext from '../../store/app-context';
import DidConfigTable from './tables/DidConfigTable';
import { DidConfig, DidWeb } from './utils/DidManagement-model';
import DidWebTable from './tables/DidWebTable';
import useDidWebService from '../../hooks/useDidWebService';
import useDidOCMService from '../../hooks/useDidOCMService';
import DidOCMTable from './tables/DidOCMTable';

const DidManagement = () => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);

  const [didConfigs, { load: loadDidConfigs }] = useArticleService<DidConfig[]>(ArticleCategory.CAROUSEL, setError);
  const [didWebs, { load: loadDidWebs }] = useDidWebService();

  const [didOCMs, { load: loadDidOCMs }] = useDidOCMService();

  useEffect(() => {
    loadDidWebs();
    loadDidConfigs();
    loadDidOCMs();
  }, [loadDidWebs, loadDidConfigs, loadDidOCMs]);

  return (
    <>
      <ContentContainer className={classes['row-gab-2rem']}>
        <Banner
          mode={BannerMode.DID_MANAGEMENT}
          title={t('did-management.banner')}
        />
        <FlexColumnContainer className={classes['row-gab-2rem']}>
          <h2>{t('did-management.headline')}</h2>
          <DidWebTable
            didWebDeleted={loadDidWebs}
            didWebSaved={loadDidWebs}
            didWebs={didWebs}
          />
          <DidConfigTable
            didConfigDeleted={loadDidConfigs}
            didConfigSaved={loadDidConfigs}
            didConfigs={didConfigs}
          />
          <DidOCMTable didOCMs={didOCMs} />
        </FlexColumnContainer>
      </ContentContainer>
    </>
  );
};

export default DidManagement;
