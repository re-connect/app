import { colors } from '../style';
import { UserInterface } from '../types/Users';
import { getTruncatedText } from './dataHelper';

export const roleBeneficiary = 'ROLE_BENEFICIAIRE';
export const rolePro = 'ROLE_MEMBRE';
export let isMember = false;

export const setIsMember = (newValue: boolean) => {
  isMember = newValue;
};

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

export const isPro = (user: UserInterface | null) => !!user && user.type_user !== roleBeneficiary;

export const isBeneficiary = (user: UserInterface | null) => !!user && user.type_user === roleBeneficiary;

export const getUserColor = (user: UserInterface | null) => (isPro(user) ? colors.blue : colors.primary);
