import { ClasseType } from '../types';

export * from './constants';
export * from './dayjs';
export * from './event';

export const capitalize = (string: string): string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1).toLocaleLowerCase()}`;

export const getEventNameDisplay = (type: string, level: string): string =>
  `${capitalize(type)} (${level.toLocaleLowerCase()})`;

export const getEventDisplayTitle = (classe: ClasseType, date: any) =>
  capitalize(
    `${classe.level} ${classe.type} class on ${date.format('dddd D')}`
  );
