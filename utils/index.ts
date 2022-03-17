import { Dayjs } from 'dayjs';
import { ClasseType, ClasseLevelEnum } from '../types';

export * from './constants';
export * from './dayjs';
export * from './event';

export const getLevelDisplay = (level: number) =>
  Object.keys(ClasseLevelEnum)
    .slice(
      Object.keys(ClasseLevelEnum).length / 2,
      Object.keys(ClasseLevelEnum).length / 2 + 2
    )
    [level].toLowerCase();

export const capitalize = (string: string): string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1).toLocaleLowerCase()}`;

export const getEventNameDisplay = (type: string, level: number): string =>
  `${capitalize(type)} (${getLevelDisplay(level)})`;

export const getEventDisplayTitle = (classe: ClasseType, date: any) =>
  capitalize(
    `${classe.level} ${classe.type} class on ${date.format('dddd D')}`
  );

/**
 * Example array
 * 0: "BEGINNER"
 * 1: "IMPROVER"
 * BEGINNER: 0
 * IMPROVER: 1
 */
export const levelOptions = Object.entries(ClasseLevelEnum)
  .slice(
    Object.keys(ClasseLevelEnum).length / 2,
    Object.keys(ClasseLevelEnum).length / 2 + 2
  )
  .map(([label, value]) => ({
    value: value,
    label: label,
  }));

/**
 * Will return the current date (in JS Date object) and the next day
 *
 * @param {Dayjs} dayDate Day JS desired date
 * @returns {Array} [Date, DateTomorrow]
 */
export const getDateAndDayAfter = (dayDate: Dayjs): [Date, Date] => {
  const date = new Date(dayDate.year(), dayDate.month(), dayDate.date());
  const nextDay = dayDate.add(1, 'day');
  const dateTomorrow = new Date(
    nextDay.year(),
    nextDay.month(),
    nextDay.date()
  );

  return [date, dateTomorrow];
};
