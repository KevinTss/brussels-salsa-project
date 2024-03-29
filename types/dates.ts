import { Dayjs as DayJs } from 'dayjs';

export enum WeekDay {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export type Dayjs = DayJs;

export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
