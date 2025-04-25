import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../ui/Banner';
import { ContentContainer, FlexColumnContainer } from '../ui/container';
import { BannerMode } from '../ui/UI-model';
import classes from './ArticleNews.module.scss';

import useArticleService from '../../hooks/useArticleService';
import AppContext from '../../store/app-context';
import ArticleTable from './tables/ArticleTable';
import NewsTable from './tables/NewsTable';
import TeaserTable from './tables/TeaserTable';
import { Article, ArticleCategory, News, Teaser } from './utils/ArticleNews-model';

const ArticleNews = () => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);

  const [teasers, { load: loadTeasers }] = useArticleService<Teaser[]>(ArticleCategory.CAROUSEL, setError);
  const [newsItems, { load: loadNews }] = useArticleService<News[]>(ArticleCategory.NEWS, setError);
  const [articles, { load: loadArticles }] = useArticleService<Article[]>(ArticleCategory.ARTICLE, setError);

  useEffect(() => {
    loadTeasers();
    loadNews();
    loadArticles();
  }, [loadTeasers, loadNews, loadArticles]);

  return (
    <>
      <ContentContainer className={classes['row-gab-2rem']}>
        <Banner
          mode={BannerMode.ARTICLE_NEWS}
          title={t('article-news.banner')}
        />
        <FlexColumnContainer className={classes['row-gab-2rem']}>
          <TeaserTable
            teaserDeleted={loadTeasers}
            teaserSaved={loadTeasers}
            teasers={teasers}
          />
          <ArticleTable
            articleDeleted={loadArticles}
            articleSaved={loadArticles}
            articles={articles}
          />
          <NewsTable
            newsDeleted={loadNews}
            newsSaved={loadNews}
            newsItems={newsItems}
          />
        </FlexColumnContainer>
      </ContentContainer>
    </>
  );
};

export default ArticleNews;
