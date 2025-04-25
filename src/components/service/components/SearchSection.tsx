import { useTranslation } from 'react-i18next';
import { Button, Stack } from 'react-bootstrap';
import uiClasses from '../../ui/UI.module.scss';
import classes from './../Service.module.scss';

import React from 'react';
import filterIcon from '../../../icons/icon-action-filter-default.svg';
import GxfsTextInput from '../../ui/GxfsTextInput';
import { ServiceSearchForm } from '../util/Service-model'; // todo: Change

interface SearchSectionProps {
  toggleFilterAction: () => void;
  onFormChangedAction: (e: any) => void;
  searchForm: ServiceSearchForm;
  searchAction: () => void;
}

const SearchSection = (props: SearchSectionProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className='background-grey pt-2 pb-2'>
        <Stack direction='horizontal'>
          <GxfsTextInput
            className={`ml-1 ${classes['service-search-input']}`}
            name='text'
            skipLabel
            placeholder={t('button.search')}
            valueChanged={props.onFormChangedAction}
            value={props.searchForm.text}
          />
          <Button
            onClick={props.searchAction}
            className={`ml-1 ms-auto ${classes['service-search-button']}`}
          >
            {t('button.search')}
          </Button>
          <Button
            className={`ml-1 mr-1 ${classes['toggle-filter-button']}`}
            onClick={props.toggleFilterAction}
          >
            <img
              src={filterIcon}
              alt='toogleFilterIcon'
              className={`filter-icon ${classes['button-action-image']}`}
            />
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default SearchSection;
