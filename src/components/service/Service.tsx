import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../ui/Banner';
import { ContentContainer, FlexColumnContainer } from '../ui/container';
import { BannerMode } from '../ui/UI-model';
import AppContext from '../../store/app-context';
import useServiceService from '../../hooks/useServiceService';
import { Service, ServiceSearchForm } from './util/Service-model';
import { SERVICES } from './util/Service-data';
import FoldableItem from './components/FoldableItem';
import ServiceItemHeader from './components/ServiceItemHeader';
import ServiceItemDetails from './components/ServiceItemDetails';
import PaginationSection from './components/PaginationSection';
import { getNewServiceSearchForm } from './util/Service-util';
import FiltersSection from './components/FiltersSection';
import SearchSection from './components/SearchSection';
import { onFormChangedFunction } from '../util/form-utils';

const ServicePage = () => {
  const { t } = useTranslation();
  const { setError } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [formData, setFormData] = useState(getNewServiceSearchForm());

  // const [services, { load: loadServices }] = useServiceService<Service[]>(setError);
  // useEffect(() => {
  //   loadDidWebs();
  // }, [loadServices]);
  const services = SERVICES;

  const onFormChanged = (e: any) => {
    setFormData(onFormChangedFunction(e));
    console.log('form data', formData);
  };
  const search = () => {
    console.log('search', formData);
  };

  return (
    <>
      <ContentContainer className='row-gap-2'>
        <Banner
          mode={BannerMode.SERVICE}
          title={t('service.services')}
        />
        <FlexColumnContainer className='row-gap-1'>
          <SearchSection
            searchAction={search}
            searchForm={formData}
            onFormChangedAction={onFormChanged}
            toggleFilterAction={() => setShowFilter(!showFilter)}
          ></SearchSection>
          {showFilter && (
            <FiltersSection
              searchForm={formData}
              onFormChangedAction={onFormChanged}
            ></FiltersSection>
          )}

          <PaginationSection
            searchForm={formData}
            onFormChangedAction={onFormChanged}
          ></PaginationSection>
          {services?.map((service) => (
            <FoldableItem
              key={service.id}
              headerContent={<ServiceItemHeader service={service}></ServiceItemHeader>}
              detailsContent={<ServiceItemDetails service={service}></ServiceItemDetails>}
            ></FoldableItem>
          ))}
        </FlexColumnContainer>
      </ContentContainer>
    </>
  );
};

export default ServicePage;
