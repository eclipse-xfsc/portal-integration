import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ImageCol from '../ui/ImageCol';
import classes from './Landing.module.scss';
import { useContext, useEffect } from 'react';
import AppContext from '../../store/app-context';
import useArticleService from '../../hooks/useArticleService';
import { Article, ArticleCategory } from '../article-news/utils/ArticleNews-model';

const Articles = () => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [articles, { load: loadArticles }] = useArticleService<Article[]>(ArticleCategory.ARTICLE, setError);
  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return !(articles && articles.length > 0) ? (
    <></>
  ) : (
    <Container className={classes['articles-container']}>
      <h2>{t('articles.title')}</h2>
      <Row className={classes['articles-row']}>
        {articles?.map((item) => (
          <Col
            className={classes['articles-col']}
            key={item.id}
            lg='4'
            md='6'
          >
            <ImageCol
              src={item.imagePath || ''}
              title={item.title || ''}
              text={item.teaserText || ''}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Articles;
