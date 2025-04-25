import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NoPaddingFlexColumnContainer } from '../ui/container';
import ImageRow from '../ui/ImageRow';
import classes from './Landing.module.scss';
import useArticleService from '../../hooks/useArticleService';
import { ArticleCategory, News } from '../article-news/utils/ArticleNews-model';
import { useContext, useEffect } from 'react';
import AppContext from '../../store/app-context';

const StaticContent = () => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [news, { load: loadNews }] = useArticleService<News[]>(ArticleCategory.NEWS, setError);
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return !(news && news.length > 0) ? (
    <></>
  ) : (
    <NoPaddingFlexColumnContainer
      fluid
      className={classes['static-content-container']}
    >
      <Container className={classes['static-content-content']}>
        {news?.map((item, index) => (
          <ImageRow
            key={item.id}
            src={item.imagePath || ''}
            title={item.title || ''}
            text={item.teaserText || ''}
            textAtFirst={!!(index % 2)}
          />
        ))}
      </Container>
    </NoPaddingFlexColumnContainer>
  );
};

export default StaticContent;
