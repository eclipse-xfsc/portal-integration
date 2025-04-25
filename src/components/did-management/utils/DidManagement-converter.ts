import { TableBody } from '../../ui/GxfsTable';
import { DidConfig, DidOCM, DidWeb, DidWebKey } from './DidManagement-model';

export const convertDidConfigToTableBody = (items: DidConfig[]): TableBody[] => {
  // return items.map((item, index) => {
  //   return { id: item.id, data: [item.name, item.config] };
  // });
  return [
    {
      id: 1,
      data: ['Name', 'http://eco.com/did/config.json'],
    },
  ];
};
export const convertDidWebToTableBody = (items: DidWeb[]): TableBody[] => {
  return items.map((item, index) => {
    return { id: item.id, data: [item.name, item.path] };
  });
};
export const convertDidOCMToTableBody = (items: DidOCM[]): TableBody[] => {
  return items.map((item, index) => {
    console.log('convert', item);
    return { id: item.did, data: [item.isInitialized ? 'Yes' : 'No', item.label, item.did, item.verkey] };
  });
};

// export const convertDidWebKeyToTableBody = (items: DidWebKey[]): TableBody[] => {
//   return items.map((item, index) => {
//     return { id: item.key, data: [item.key, index + 1] };
//   });
// };
