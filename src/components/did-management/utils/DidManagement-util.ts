import { DidConfigForm, DidWeb, DidWebForm, DidWebKeyForm } from './DidManagement-model';

export const getNewDidConfig = (): DidConfigForm => {
  return { name: '' };
};
export const getNewDidWeb = (): DidWebForm => {
  return { name: '', path: '' };
};
export const getDidWeb = (): DidWeb => {
  return { id: 1, name: 'name1', path: 'pathone', did: 'did:web:eco.com:example' };
};
export const getNewDidWebKey = (): DidWebKeyForm => {
  return { key: '' };
};
