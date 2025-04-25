import { TableBody } from '../../ui/GxfsTable';
import { Article, News, Teaser } from './ArticleNews-model';

export const convertArticleToTableBody = (articles: Article[]): TableBody[] => {
  return articles.map((item, index) => {
    return { id: item.id, data: [item.title, index + 1] };
  });
};
export const convertNewsToTableBody = (newsItems: News[]): TableBody[] => {
  return newsItems.map((item, index) => {
    return { id: item.id, data: [item.title, index + 1] };
  });
};
export const convertTeaserToTableBody = (teasers: Teaser[]): TableBody[] => {
  return teasers.map((item, index) => {
    return { id: item.id, data: [item.title, index + 1] };
  });
};
