import { CenterInterface, UserCenterInterface } from '../types/Centers';

export const acceptCenterInList = (list: UserCenterInterface[], center: CenterInterface) => {
  const acceptedCenter = list.find((item: UserCenterInterface) => item.centre.id === center.id);
  if (!acceptedCenter) {
    return list;
  }
  return [
    ...list.filter((item: UserCenterInterface) => item.centre.id !== center.id),
    { ...acceptedCenter, b_valid: true },
  ];
};

export const removeCenterFromList = (list: UserCenterInterface[], centerId: number) => [
  ...list.filter((item: UserCenterInterface) => item.centre.id !== centerId),
];
