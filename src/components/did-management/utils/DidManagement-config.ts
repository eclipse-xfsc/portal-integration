import { TableHeader } from '../../ui/GxfsTable';

export const DID_CONFIG_HEADERS: TableHeader[] = [
  { textKey: 'did-management.name' },
  { textKey: 'did-management.config' },
];
export const DID_WEB_HEADERS: TableHeader[] = [
  { textKey: 'did-management.name' },
  { textKey: 'did-management.keys' },
  { textKey: 'did-management.did' },
];
export const DID_WEB_SELECT_HEADERS: TableHeader[] = [
  { textKey: 'did-management.name' },
  { textKey: 'did-management.did' },
  { textKey: 'did-management.select', width: '50px' },
];
export const DID_WEB_KEY_HEADERS: TableHeader[] = [
  { textKey: 'did-management.name' },
  { textKey: 'did-management.pubkey' },
  { textKey: 'did-management.path' },
];
export const DID_OCM_HEADERS: TableHeader[] = [
  { textKey: 'did-management.is-initialized' },
  { textKey: 'did-management.label' },
  { textKey: 'did-management.did' },
  { textKey: 'did-management.verification-key' },
];
