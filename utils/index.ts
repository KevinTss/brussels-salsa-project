import dayjs, { Dayjs } from 'dayjs';
import { Classe, ClasseLevel, User, ClasseType, WeekDay } from '../types';

export * from './classe.utils';
export * from './constants';
export * from './date.utils';
export * from './event.utils';
export * from './string.utils';

export const getLevelDisplay = (level: number) =>
  ['Beginner', 'Improver'][level];

export const capitalize = (string: string): string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1).toLocaleLowerCase()}`;

export const getEventNameDisplay = (type: string, level: number): string =>
  `${capitalize(type)} (${getLevelDisplay(level)})`;

export const getEventDisplayTitle = (classe: Classe, date: Dayjs) =>
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
export const levelOptions = Object.entries(ClasseLevel)
  .slice(
    Object.keys(ClasseLevel).length / 2,
    Object.keys(ClasseLevel).length / 2 + 2
  )
  .map(([label, value]) => ({
    value: value,
    label: capitalize(label.toLowerCase()),
  }));

export const typeOptions = Object.values(ClasseType).map((key) => ({
  value: key,
  label: capitalize(key),
}));

export const hourOptions = [...Array(24).keys()].map((i) => ({
  value: i.toString().padStart(2, '0'),
  label: i.toString().padStart(2, '0') + 'h',
}));

export const minuteOptions = [
  { value: '30', label: '30' },
  { value: '00', label: '00' },
];

export const weekDayOptions = Object.values(WeekDay).map((key) => ({
  value: key,
  label: capitalize(key),
}));

/**
 * Will return the current date (in JS Date object) and the next day
 *
 * @param {Dayjs} dayDate Day JS desired date
 * @returns {[Dayjs, Dayjs]} [DateToday, DateTomorrow]
 */
export const getDateAndDayAfter = (dayDate: Dayjs): [Dayjs, Dayjs] => {
  const date = new Date(dayDate.year(), dayDate.month(), dayDate.date());
  const nextDay = dayDate.add(1, 'day');
  const dateTomorrow = new Date(
    nextDay.year(),
    nextDay.month(),
    nextDay.date()
  );

  return [dayjs(date), dayjs(dateTomorrow)];
};

/**
 * Check if user has the level required for the specified class
 */
export const hasUserClassLevelRequired = (
  user: User,
  classe: Classe
): boolean => {
  const classType = classe.type;
  const userLevel = user?.levels?.[classType] || 0;

  return userLevel >= classe.level;
};

export const normalize = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .normalize()
    .replace(/[\u0300-\u036f]/g, '');

export const getTimeFromClasse = (classe: Classe) => classe.time.split(':');

const getNumberDay = (day: WeekDay) => {
  const index = Object.values(WeekDay).findIndex((val) => val === day);

  return index >= 0 ? index : 0;
};

export const getClassesSortedByDayAndTime = (
  classesList: Classe[]
): Classe[] => {
  const clonedList = [...classesList];

  const sortedList = clonedList.sort((classeA, classeB) => {
    if (classeA.day === classeB.day) {
      return classeA.time.localeCompare(classeB.time);
    }
    const dayA = getNumberDay(classeA.day);
    const dayB = getNumberDay(classeB.day);

    return dayA - dayB;
  });

  return sortedList;
};
