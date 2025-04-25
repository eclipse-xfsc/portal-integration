import { ArticleCategory, ArticleForm, NewsForm, TeaserForm } from './ArticleNews-model';

export const getNewTeaser = (): TeaserForm => {
  return { title: '', teaserText: '', imagePath: '', category: ArticleCategory.CAROUSEL };
};
export const getNewNews = (): NewsForm => {
  return { title: '', teaserText: '', imagePath: '', category: ArticleCategory.NEWS };
};
export const getNewArticle = (): ArticleForm => {
  return { title: '', teaserText: '', imagePath: '', category: ArticleCategory.ARTICLE };
};
