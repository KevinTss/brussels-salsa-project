import { Dayjs } from 'dayjs';

export * from './classes';
export * from './dates';
export * from './routes';
export * from './users';

type DancerJoinType = {
  joinOn: Date;
  userId: string;
};
type DancersListType = {
  males?: DancerJoinType[];
  females?: DancerJoinType[];
};

export type EventType = {
  id?: string;
  classId: string;
  date: string;
  dancers?: DancersListType;
  waitingList?: DancersListType;
};

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
