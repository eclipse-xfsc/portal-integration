import { SelectItem } from '../../ui/GxfsSelect';
import { Service } from './Service-model';
const HEADLINE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi';
export const generateTestSelectItems = (name: string, count: number) => {
  const result: SelectItem[] = [];
  for (let i = 0; i < count; i++) {
    result.push({ id: i + 1, value: `${name} ${i + 1}` });
  }
  return result;
};

export const generateTestServices = (count: number) => {
  const result: Service[] = [];
  for (let i = 0; i < count; i++) {
    const id = i + 1;
    result.push({
      id: id,
      name: `Analytical Supporting (3-${id})`,
      stack: 'Stack ' + id,
      security: 'Security ' + id,
      location: 'Location ' + id,
      termsOfUse: 'Terms of use ' + id,
      tags: ['Atag', 'Btag', 'Ctag'],
      lastUpdate: '2022-11-04',
      category: 'Category ' + id,
      headline: HEADLINE,
    });
  }
  return result;
};
export const SERVICES: Service[] = generateTestServices(5);
