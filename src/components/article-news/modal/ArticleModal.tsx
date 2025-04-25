import { useContext, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useArticleService from '../../../hooks/useArticleService';
import AppContext from '../../../store/app-context';
import DataModificationModal, { DataModificationModalProps } from '../../ui/DataModificationModal';
import GxfsTextarea from '../../ui/GxfsTextarea';
import GxfsTextInput from '../../ui/GxfsTextInput';
import { onFormChangedFunction, submitForm } from '../../util/form-utils';
import { Article, ArticleCategory } from '../utils/ArticleNews-model';
import { getNewArticle } from '../utils/ArticleNews-util';
import IntroText from '../../ui/IntroText';

interface ArticleModalProps extends DataModificationModalProps {
  data?: Article;
}

const ArticleModal = (props: ArticleModalProps) => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [formData, setFormData] = useState(getNewArticle());
  const [, { update: updateArticle, add: addArticle }] = useArticleService<Article[]>(
    ArticleCategory.ARTICLE,
    setError
  );
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(props.data ? props.data : getNewArticle());
  }, [props.data]);

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
  };

  const handleValidateAndSave = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      handleSave();
    }
  };

  const handleSave = () => {
    const onSuccess = () => {
      props.handleSave();
      props.handleClose();
    };

    formData.id ? updateArticle(formData, onSuccess) : addArticle(formData, onSuccess);
  };

  return (
    <DataModificationModal
      show={props.show}
      handleClose={props.handleClose}
      handleSave={() => submitForm(formRef)}
      handleExited={props.handleExited}
      title={props.title}
      dialogClass='modal-article-news'
    >
      <Form
        noValidate
        validated={validated}
        onSubmit={handleValidateAndSave}
        ref={formRef}
      >
        <fieldset>
          <IntroText text={t('article-news.article-intro-text')}></IntroText>
          <GxfsTextInput
            name='title'
            label={t('article-news.article-name')}
            valueChanged={onFormChanged}
            value={formData.title}
            required
          />
          <GxfsTextInput
            name='imagePath'
            label={t('article-news.teaser-image')}
            valueChanged={onFormChanged}
            value={formData.imagePath}
          />
          <GxfsTextarea
            name='teaserText'
            label={t('article-news.teaser-text-max350')}
            valueChanged={onFormChanged}
            value={formData.teaserText}
            required
            max={350}
          />
        </fieldset>
      </Form>
    </DataModificationModal>
  );
};

export default ArticleModal;
