import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});
dayjs.extend(weekday);
dayjs.extend(isToday);

export const djs = dayjs;

export const getDisplayDayOfWeek = (date: any): string =>
  djs.weekdays()[(date || djs()).day()];
