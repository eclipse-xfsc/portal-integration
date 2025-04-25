import { TableHeader } from '../../ui/GxfsTable';

export const CLAIM_MAPPING_HEADERS: TableHeader[] = [
  { textKey: 'claim-mapping.name' },
  { textKey: 'claim-mapping.description' },
  { textKey: 'claim-mapping.claim' },
  { textKey: 'claim-mapping.role' },
  { textKey: 'claim-mapping.context' },
];
export const ROLE_HEADERS: TableHeader[] = [{ textKey: 'claim-mapping.name' }];
export const CLAIM_HEADERS: TableHeader[] = [{ textKey: 'claim-mapping.name' }];
export const CLAIM_MAPPING_CONTEXT = 'Default'; //  treated like a namespace but it's just a string so we can test with whatever we'd like, I asked Steffen what to put there
