export type Gender = 'male' | 'female';

export type DancerRole = 'leader' | 'follower';

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
