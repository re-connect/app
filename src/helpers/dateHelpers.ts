import { differenceInDays, format, isToday, isTomorrow } from 'date-fns';
import t from '../services/translation';
import { colors } from '../style';

export const getDateColour = (date: Date) => {
  const today = new Date();
  const daysToEvent = differenceInDays(date, today);

  return daysToEvent <= 5 ? colors.red : colors.gray;
};

export const getReadableDate = (date: Date) => {
  if (isToday(date)) return `${t.t('today')} ${format(date, 'HH:mm')}`;
  if (isTomorrow(date)) return t.t('tomorow');

  const today = new Date();
  const daysToDate = differenceInDays(date, today);

  return `${daysToDate} ${t.t('day')}${daysToDate === 1 ? '' : 's'}`;
};
