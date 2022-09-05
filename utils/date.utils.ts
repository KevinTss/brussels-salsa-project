import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';

import { WeekDay, Day, Dayjs } from '../types';

dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});
dayjs.extend(weekday);
dayjs.extend(isToday);

export const djs = dayjs;

export const getWeekDay = (date: Dayjs): Day =>
  ((date.day() === 0 ? 7 : date.day()) - 1) as Day;

export const getDisplayWeekDay = (day: Day) => Object.values(WeekDay)[day];

export const getStartWeekDate = (date: Dayjs) => {
  const weekDay = getWeekDay(date);

  if (weekDay === 0) return date.hour(0).minute(0).second(0).millisecond(0);

  return date
    .subtract(weekDay, 'day')
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
};

export const getEndWeekDate = (date: Dayjs) => {
  const weekDay = getWeekDay(date);

  if (weekDay === 6) return date.hour(0).minute(0).second(0).millisecond(0);

  return date
    .add(6 - weekDay, 'day')
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
};

export const days: WeekDay[] = [
  WeekDay.SUNDAY,
  WeekDay.MONDAY,
  WeekDay.TUESDAY,
  WeekDay.WEDNESDAY,
  WeekDay.THURSDAY,
  WeekDay.FRIDAY,
  WeekDay.SATURDAY,
];
