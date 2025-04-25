import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useArticleService from '../../../hooks/useArticleService';
import AppContext from '../../../store/app-context';
import classes from '../../claim-mapping/ClaimMapping.module.scss';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import ArticleModal from '../modal/ArticleModal';
import { ARTICLE_HEADERS } from '../utils/ArticleNews-config';
import { convertArticleToTableBody } from '../utils/ArticleNews-converter';
import { Article, ArticleCategory } from '../utils/ArticleNews-model';
import { getNewArticle } from '../utils/ArticleNews-util';

interface ArticleTableProps {
  articles?: Article[];
  articleSaved: () => void;
  articleDeleted: () => void;
}

const ArticleTable = (props: ArticleTableProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [editData, setEditData] = useState<Article>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [, { deleteData: deleteArticle }] = useArticleService<Article[]>(ArticleCategory.ARTICLE, setError);

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => {
    props.articleSaved();
  };
  const handleExited = () => setEditData(undefined);

  const handleEditArticleAction = (articleId?: number | string) => {
    setShowEditWindow(true);
    setEditData(props.articles!.find((item) => item.id === articleId));
  };
  const handleNewArticleAction = () => {
    setShowEditWindow(true);
    setEditData(getNewArticle() as Article);
  };

  const handleDeleteArticle = (articleId?: number | string) => {
    deleteArticle(articleId, () => props.articleDeleted());
  };

  return (
    <>
      {props.articles && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <h3 className='pt-4 pb-2'>{t('article-news.article-header')}</h3>
          <GxfsTable
            headers={ARTICLE_HEADERS}
            body={convertArticleToTableBody(props.articles)}
            onDeleteClick={handleDeleteArticle}
            onEditClick={handleEditArticleAction}
            onAddClick={handleNewArticleAction}
          />
          <ArticleModal
            show={showEditWindow}
            title={t(!editData ? 'article-news.add-article' : 'article-news.edit-article')}
            data={editData}
            handleSave={handleSave}
            handleClose={handleClose}
            handleExited={handleExited}
          />
        </NoPaddingFlexColumnContainer>
      )}
    </>
  );
};
export default ArticleTable;
