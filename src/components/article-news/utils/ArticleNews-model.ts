import { Identifiable } from '../../util/common-model';

export enum ArticleCategory {
  NEWS = 'NEWS',
  ARTICLE = 'ARTICLE',
  CAROUSEL = 'CAROUSEL',
}

export interface Teaser extends Identifiable {
  title?: string;
  teaserText?: string;
  imagePath?: string;
  category?: ArticleCategory;
}

export interface Article extends Identifiable {
  title?: string;
  teaserText?: string;
  imagePath?: string;
  category?: ArticleCategory;
}
export interface News extends Identifiable {
  title?: string;
  teaserText?: string;
  imagePath?: string;
  category?: ArticleCategory;
  articleText?: string;
}
export interface TeaserForm extends Identifiable {
  title?: string;
  teaserText?: string;
  imagePath?: string;
  category?: ArticleCategory;
}

export interface ArticleForm extends Identifiable {
  title?: string;
  teaserText?: string;
  imagePath?: string;
  category?: string;
}
export interface NewsForm extends Identifiable {
  title?: string;
  teaserText?: string;
  imagePath?: string;
  category?: ArticleCategory;
  articleText?: string;
}
