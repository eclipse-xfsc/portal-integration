import { useTranslation } from 'react-i18next';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import GxfsSelect from '../../ui/GxfsSelect';
import { ServiceSearchForm } from '../util/Service-model';
import { useState } from 'react';
import { generateTestSelectItems } from '../util/Service-data';

interface FiltersSectionProps {
  searchForm: ServiceSearchForm;
  onFormChangedAction: (e: any) => void;
}

const FiltersSection = (props: FiltersSectionProps) => {
  const { t } = useTranslation();
  const [moreFilters, setMoreFilters] = useState(false);
  return (
    <>
      <div className='background-grey pt-2'>
        <Container>
          <Row>
            <Col>
              {' '}
              <GxfsSelect
                skipLabel
                items={generateTestSelectItems('Continent', 3)}
                value={props.searchForm.continent}
                name='continent'
                defaultText={t('service.continent')}
                valueChanged={props.onFormChangedAction}
              ></GxfsSelect>
            </Col>
            <Col>
              <GxfsSelect
                skipLabel
                items={generateTestSelectItems('Country', 6)}
                value={props.searchForm.country}
                name='country'
                defaultText={t('service.country')}
                valueChanged={props.onFormChangedAction}
              ></GxfsSelect>
            </Col>
            <Col>
              <GxfsSelect
                skipLabel
                items={generateTestSelectItems('Region', 5)}
                value={props.searchForm.region}
                name='region'
                defaultText={t('service.region')}
                valueChanged={props.onFormChangedAction}
              ></GxfsSelect>
            </Col>
            <Col>
              <GxfsSelect
                skipLabel
                items={generateTestSelectItems('City', 8)}
                value={props.searchForm.city}
                name='city'
                defaultText={t('service.city')}
                valueChanged={props.onFormChangedAction}
              ></GxfsSelect>
            </Col>
            <Col>
              <div
                className='gxfs-font-dark-medium-normal-underline float-end'
                onClick={() => setMoreFilters(!moreFilters)}
              >
                {moreFilters ? t('service.less-filters') : t('service.more-filters')}
              </div>
            </Col>
          </Row>
          {moreFilters && (
            <Row>
              <Col>
                <GxfsSelect
                  skipLabel
                  items={generateTestSelectItems('Node', 5)}
                  value={props.searchForm.node}
                  name='node'
                  defaultText={t('service.node')}
                  valueChanged={props.onFormChangedAction}
                ></GxfsSelect>
              </Col>
              <Col>
                <GxfsSelect
                  skipLabel
                  items={generateTestSelectItems('Provider', 5)}
                  value={props.searchForm.provider}
                  name='provider'
                  defaultText={t('service.provider')}
                  valueChanged={props.onFormChangedAction}
                ></GxfsSelect>
              </Col>
              <Col>
                <GxfsSelect
                  skipLabel
                  items={generateTestSelectItems('Storage', 5)}
                  value={props.searchForm.storage}
                  name='storage'
                  defaultText={t('service.storage')}
                  valueChanged={props.onFormChangedAction}
                ></GxfsSelect>
              </Col>
              <Col>
                <GxfsSelect
                  skipLabel
                  items={generateTestSelectItems('Service', 5)}
                  value={props.searchForm.service}
                  name='service'
                  defaultText={t('service.service')}
                ></GxfsSelect>
              </Col>
              <Col>
                <GxfsSelect
                  skipLabel
                  items={[]}
                  value={props.searchForm.compute}
                  name='compute'
                  disabled
                  defaultText={t('service.compute')}
                ></GxfsSelect>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default FiltersSection;
