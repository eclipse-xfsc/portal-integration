import { ServiceSearchForm } from './Service-model';

export const getNewServiceSearchForm = (): ServiceSearchForm => {
  return {
    text: '',
    continent: -1,
    country: -1,
    region: -1,
    city: -1,
    node: -1,
    provider: -1,
    storage: -1,
    service: -1,
    order: -1,
  };
};
