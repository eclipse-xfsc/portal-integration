import { CredentialSettingsForm, NotarizationRequestEditForm, NotarizationRequestForm } from './Notarization-model';

export const getNewNotarizationRequest = (): NotarizationRequestForm => {
  return { name: '', wallet: -1, filename: '', type: -1 };
};
export const getEditedNotarizationRequest = (): NotarizationRequestEditForm => {
  return { comment: '' };
};
export const getNewCredentialSettings = (): CredentialSettingsForm => {
  return { name: '', company: '', address: '' };
};
