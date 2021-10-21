import { Dayjs } from 'dayjs';

export type ClasseType = {
  spots: {
    base: number;
    max?: number;
  };
  day: string;
  frequency: string;
  id?: string;
  level: 'beginner' | 'improver';
  time: string;
  type: 'salsa';
};

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
