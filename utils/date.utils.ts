import { djs } from './dayjs';
import { WeekDay, Day, Dayjs } from '../types';

export const getWeekDay = (date = djs()): Day =>
  ((date.day() === 0 ? 7 : date.day()) - 1) as Day;

export const getDisplayWeekDay = (day: Day) => Object.values(WeekDay)[day];

export const getStartWeekDate = (date: Dayjs) => {
  const weekDay = getWeekDay(date);

  if (weekDay === 0) return date;

  return date.subtract(weekDay, 'day');
};

export const getEndWeekDate = (date: Dayjs) => {
  const weekDay = getWeekDay(date);

  if (weekDay === 6) return date;

  return date.add(6 - weekDay, 'day');
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
