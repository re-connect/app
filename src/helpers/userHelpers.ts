import { UserInterface } from '../types/Users';
import { getTruncatedText } from './dataHelper';

export const getFullName = (user: UserInterface | null) => {
  if (!user) {
    return '';
  }
  const { prenom, nom } = user;

  return `${prenom.charAt(0).toUpperCase() + prenom.slice(1)} ${nom.toUpperCase()}`;
};

export const getTruncatedFullName = (user: UserInterface | null) => {
  if (!user) {
    return '';
  }
  const fullName = getFullName(user);

  return getTruncatedText(fullName);
};

export const formatPhoneForApi = (phone: string) => {
  if (phone.length === 9) {
    return `+33${phone}`;
  } else if (phone.length === 10 && phone[0] === '0') {
    return `+33${phone.slice(1)}`;
  }
  return phone;
};
