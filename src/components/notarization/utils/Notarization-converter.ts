import { TableBody } from '../../ui/GxfsTable';
import { NotarizationRequest } from './Notarization-model';

export const convertNotarizationRequestToTableBody = (items: NotarizationRequest[]): TableBody[] => {
  return items.map((item, index) => {
    return { id: item.id, data: [item.name, item.date, '...'] };
  });
};
