import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useArticleService from '../../../hooks/useArticleService';
import AppContext from '../../../store/app-context';
import classes from '../../claim-mapping/ClaimMapping.module.scss';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import NewsModal from '../modal/NewsModal';
import { NEWS_HEADERS } from '../utils/ArticleNews-config';
import { convertNewsToTableBody } from '../utils/ArticleNews-converter';
import { ArticleCategory, News } from '../utils/ArticleNews-model';
import { getNewNews } from '../utils/ArticleNews-util';

interface NewsTableProps {
  newsItems?: News[];
  newsSaved: () => void;
  newsDeleted: () => void;
}

const NewsTable = (props: NewsTableProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [editData, setEditData] = useState<News>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [, { deleteData: deleteNews }] = useArticleService<News[]>(ArticleCategory.NEWS, setError);

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => props.newsSaved();
  const handleExited = () => setEditData(undefined);

  const handleEditNewsAction = (newsId?: number | string) => {
    setShowEditWindow(true);
    setEditData(props.newsItems!.find((item) => item.id === newsId));
  };
  const handleNewNewsAction = () => {
    setShowEditWindow(true);
    setEditData(getNewNews());
  };

  const handleDeleteNews = (newsId?: number | string) => {
    deleteNews(newsId, () => props.newsDeleted());
  };
  return (
    <>
      {props.newsItems && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <h3 className='pt-4 pb-2'>{t('article-news.news-header')}</h3>
          <GxfsTable
            headers={NEWS_HEADERS}
            body={convertNewsToTableBody(props.newsItems)}
            onDeleteClick={handleDeleteNews}
            onEditClick={handleEditNewsAction}
            onAddClick={handleNewNewsAction}
          />
          <NewsModal
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
export default NewsTable;
