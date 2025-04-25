import { SelectItem } from '../../ui/GxfsSelect';
import { NotarizationRequest, NotarizationRequestItem } from './Notarization-model';

export const CREDENTIAL_TYPES: SelectItem[] = [
  { id: 1, value: 'Credential Type 1' },
  { id: 2, value: 'Credential Type 2' },
  { id: 3, value: 'Credential Type 3' },
];
export const WALLETS: SelectItem[] = [
  { id: 1, value: 'OCM' },
  { id: 2, value: 'Wallet 2' },
  { id: 3, value: 'Wallet 3' },
];
export const NOTARIZATION_REQUESTS: NotarizationRequest[] = [
  {
    id: 1,
    name: 'Request 1',
    date: '11.11.2022',
    wallet: 1,
    filename: 'Document123.pdf',
    type: 1,
    personalData: 'Heiner Muller, 24.03.1971, Adresse',
  },
  {
    id: 2,
    name: 'Request 2',
    date: '11.11.2022',
    wallet: 2,
    filename: 'Document124.pdf',
    type: 2,
    personalData: 'Heiner Neuer, 24.03.1971, Adresse',
  },
  {
    id: 3,
    name: 'Request 3',
    date: '11.11.2022',
    wallet: 3,
    filename: 'Document125.pdf',
    type: 3,
    personalData: 'Heiner Alter, 24.03.1971, Adresse',
  },
];
