import { Dayjs } from 'dayjs';

export * from './classes';
export * from './dates';
export * from './routes';
export * from './users';
export * from './events';

export const DayjsType = Dayjs;

export enum CalendarView {
  DAY,
  WEEK,
}

export enum AdminView {
  CALENDAR,
  CLASSES,
  USERS,
}

export type Children = JSX.Element | JSX.Element[] | string;
