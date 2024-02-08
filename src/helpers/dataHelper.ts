import { AnyDataInterface } from '../types/Data';

export const updateDatumInList = (list: AnyDataInterface[], itemId: number, newDatum: AnyDataInterface) => {
  return list.map((item: AnyDataInterface) => (item.id !== itemId ? item : newDatum));
};

export const removeDatumInList = (list: AnyDataInterface[], itemId: number) => {
  return list.filter((item: AnyDataInterface) => item.id !== itemId);
};

export const findById = (list: AnyDataInterface[], itemId: number) => {
  return list.find((item: AnyDataInterface) => item.id === itemId);
};

export const findBy = (list: AnyDataInterface[], criteria: any) =>
  list.filter((item: any) => {
    let itemMatches = true;
    Object.keys(criteria).forEach((criterion: string) => {
      const itemValue = item[criterion];
      const criterionValue = criteria[criterion];
      if (!criterionValue) {
        if (itemValue) {
          itemMatches = false;
        }
      } else if (itemValue !== criterionValue) {
        itemMatches = false;
      }
    });

    return itemMatches;
  });

export const getTruncatedText = (text: string) => (text.length > 20 ? `${text.substring(0, 20)}...` : text);
