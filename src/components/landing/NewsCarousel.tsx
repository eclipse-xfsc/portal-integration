import { Carousel, Container, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classes from './Landing.module.scss';
import { useContext, useEffect } from 'react';
import AppContext from '../../store/app-context';
import useArticleService from '../../hooks/useArticleService';
import { ArticleCategory, Teaser } from '../article-news/utils/ArticleNews-model';
import { useKeycloak } from '@react-keycloak/web';
import { useAuth } from 'oidc-react';

const NewsCarousel = () => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const auth = useAuth();
  const [teasers, { load: loadTeasers }] = useArticleService<Teaser[]>(ArticleCategory.CAROUSEL, setError);
  useEffect(() => {
    loadTeasers();
  }, [loadTeasers]);

  return (
    <Carousel
      className={`${classes['news-carousel']} ${classes[auth.userData ? 'authenticated' : 'not-authenticated']}`}
      controls={false}
    >
      {teasers?.map((item) => (
        <Carousel.Item key={item.id}>
          <Container className={`${classes['carousel-container']}`}>
            <Container>
              <h1>{item.title}</h1>
              <p>{item.teaserText}</p>
            </Container>
            <Image
              src={item.imagePath}
              className={classes['carousel-image']}
            />
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default NewsCarousel;
