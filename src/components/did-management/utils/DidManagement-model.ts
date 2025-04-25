import { Identifiable } from '../../util/common-model';

export interface DidConfig extends Identifiable {
  name?: string;
  config?: string;
  webConfig?: DidWeb;
}

export interface DidWeb extends Identifiable {
  name?: string;
  path?: string;
  did?: string;
  keys?: DidWebKey[];
}
export interface DidWebKey {
  key?: string;
  name?: string;
  public_key?: string;
  path?: string;
}
export interface DidConfigForm extends Identifiable {
  name?: string;
  webConfig?: DidWebForm;
}

export interface DidWebForm extends Identifiable {
  name?: string;
  path?: string;
}
export interface DidWebKeyForm {
  key?: string;
}
export interface DidOCM {
  isInitialized?: string;
  label?: string;
  did?: string;
  verkey?: string;
}
