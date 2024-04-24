import { colors } from '../style';
import { UserField, UserInterface } from '../types/Users';
import { getTruncatedText } from './dataHelper';
import { dateToOldApiFormat, stringToDate } from './dateHelpers';

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

const formatBirthDateForApi = (birthDate: string):string => {
  return dateToOldApiFormat(stringToDate(birthDate));
};

const formatPhoneForApi = (phone: string):string => {
  if (phone.length === 9) {
    return `+33${phone}`;
  } else if (phone.length === 10 && phone[0] === '0') {
    return `+33${phone.slice(1)}`;
  }
  return phone;
};

export const formatUserItemsForApi = (values: Record<UserField, string>): Record<UserField, string> => {
  const formattedValues = {...values};

  if (values.telephone) {
    formattedValues.telephone = formatPhoneForApi(values.telephone);
  }
  if (values.date_naissance) {
    formattedValues.date_naissance = formatBirthDateForApi(values.date_naissance);
  }

  return formattedValues;
};

export const isPro = (user: UserInterface | null) => !!user && user.type_user !== roleBeneficiary;

export const isBeneficiary = (user: UserInterface | null) => !!user && user.type_user === roleBeneficiary;

export const getUserColor = (user: UserInterface | null) => (isPro(user) ? colors.blue : colors.primary);
