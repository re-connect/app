import { differenceInDays, format, formatISO, isToday, isTomorrow, parse, parseISO } from 'date-fns';
import t from '../services/translation';
import { colors } from '../style';

export const getDateColour = (date: Date) => {
  const today = new Date();
  const daysToEvent = differenceInDays(date, today);

  return daysToEvent <= 5 ? colors.red : colors.gray;
};

export const getReadableDate = (date: Date) => {
  if (isToday(date)) {
    return `${t.t('today')} ${format(date, 'HH:mm')}`;
  }
  if (isTomorrow(date)) {
    return t.t('tomorow');
  }

  const today = new Date();
  const daysToDate = differenceInDays(date, today);

  return `${daysToDate} ${t.t('day')}${daysToDate === 1 ? '' : 's'}`;
};

export const stringToDate = (string: string) => {
  let date = new Date();
  if (string !== '') {
    date = parse(string, 'dd/MM/yyyy', new Date());
  }

  return date;
};

export const dateToString = (date: Date) => format(date, 'dd/MM/yyyy');

export const dateToOldApiFormat = (date: Date) => format(date, 'yyyy-MM-dd');

export const dateToIso = (date?: Date): string => formatISO(date ?? new Date());

export const isoToDate = (iso?: string): Date => (iso ? parseISO(iso) : new Date());
