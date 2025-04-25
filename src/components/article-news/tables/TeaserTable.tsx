import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useArticleService from '../../../hooks/useArticleService';
import AppContext from '../../../store/app-context';
import classes from '../../claim-mapping/ClaimMapping.module.scss';
import { NoPaddingFlexColumnContainer } from '../../ui/container';
import GxfsTable from '../../ui/GxfsTable';
import TeaserModal from '../modal/TeaserModal';
import { TEASER_HEADERS } from '../utils/ArticleNews-config';
import { convertTeaserToTableBody } from '../utils/ArticleNews-converter';
import { ArticleCategory, Teaser } from '../utils/ArticleNews-model';
import { getNewTeaser } from '../utils/ArticleNews-util';

interface TeaserTableProps {
  teasers?: Teaser[];
  teaserSaved: () => void;
  teaserDeleted: () => void;
}

const TeaserTable = (props: TeaserTableProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [editData, setEditData] = useState<Teaser>();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [, { deleteData: deleteTeaser }] = useArticleService<Teaser[]>(ArticleCategory.CAROUSEL, setError);

  const handleClose = () => setShowEditWindow(false);
  const handleSave = () => props.teaserSaved();
  const handleExited = () => setEditData(undefined);

  const handleEditTeaserAction = (teaserId?: number | string) => {
    setShowEditWindow(true);
    setEditData(props.teasers!.find((item) => item.id === teaserId));
  };
  const handleNewTeaserAction = () => {
    setShowEditWindow(true);
    setEditData(getNewTeaser());
  };

  const handleDeleteTeaser = (teaserId?: number | string) => {
    deleteTeaser(teaserId, () => props.teaserDeleted());
  };

  return (
    <>
      {props.teasers && (
        <NoPaddingFlexColumnContainer className={classes['row-gab-1rem']}>
          <h3 className='pt-4 pb-2'>{t('article-news.teaser-header')}</h3>
          <GxfsTable
            headers={TEASER_HEADERS}
            body={convertTeaserToTableBody(props.teasers)}
            onDeleteClick={handleDeleteTeaser}
            onEditClick={handleEditTeaserAction}
            onAddClick={handleNewTeaserAction}
          />
          <TeaserModal
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
export default TeaserTable;
