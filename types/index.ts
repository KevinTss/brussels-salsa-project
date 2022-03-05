import { Dayjs } from 'dayjs';

export * from './dates';
export * from './classes';

export type EventType = {
  id?: string;
  classId: string;
  date: string;
  dancers: {
    female: string[];
    male: string[];
  };
};

export const DayjsType = Dayjs;

export enum CalendarView {
  DAY,
  WEEK,
}

export enum AdminView {
  CALENDAR,
  CLASSES,
}

export type Children = JSX.Element | JSX.Element[] | string;
