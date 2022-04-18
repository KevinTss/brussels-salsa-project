import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';

import { WeekDay } from '../../types';

dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});
dayjs.extend(weekday);
dayjs.extend(isToday);

export const djs = dayjs;

export const getDisplayDayOfWeek = (date: Dayjs): WeekDay =>
  djs.weekdays()[(date || djs()).day()] as WeekDay;
