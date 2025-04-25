import { Identifiable } from '../../util/common-model';

export interface Service extends Identifiable {
  name?: string;
  stack?: string;
  security?: string;
  location?: string;
  headline?: string;
  tags?: string[];
  lastUpdate?: string;
  termsOfUse?: string;
  category?: string;
}

export interface ServiceSearchForm extends Identifiable {
  text?: string;
  continent?: number;
  country?: number;
  region?: number;
  city?: number;
  node?: number;
  provider?: number;
  storage?: number;
  service?: number;
  compute?: number;
  order?: number;
}
