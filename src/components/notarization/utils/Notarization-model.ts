import { Identifiable } from '../../util/common-model';

export interface NotarizationRequestForm extends Identifiable {
  name?: string;
  wallet?: number;
  filename?: string;
  type?: number;
}
export interface NotarizationRequestEditForm {
  comment?: string;
}

export interface NotarizationRequest extends Identifiable {
  personalData?: string;
  name?: string;
  wallet?: number;
  filename?: string;
  fileUrl?: string;
  type?: number;
  date?: string;
  comment?: string;
  approved?: boolean;
}
export interface NotarizationRequestItem extends Identifiable {
  name?: string;
  date?: string;
  otherParameter?: string;
}
export interface CredentialSettingsForm extends Identifiable {
  name?: string;
  company?: string;
  address?: string;
}

export interface CredentialSettings extends Identifiable {
  name?: string;
  company?: string;
  address?: string;
}
