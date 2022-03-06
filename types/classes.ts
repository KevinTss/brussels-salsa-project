import { WeekDayEnum } from './dates';

export enum ClasseTypeEnum {
  BACHATA = 'BACHATA',
  SALSA = 'SALSA',
}

export enum ClasseLevelEnum {
  BEGINNER = 'BEGINNER',
  IMPROVER = 'IMPROVER',
}

export enum ClasseFrequencyEnum {
  WEEKLY = 'WEEKLY',
}

export type ClasseType = {
  day: WeekDayEnum;
  frequency: ClasseFrequencyEnum;
  id?: string;
  level: ClasseLevelEnum;
  spots: { base: number; max?: number };
  time: string;
  type: ClasseTypeEnum;
};

export type ClassesContext = {
  add: (data: NewClasseData) => Promise<void>;
  getById: (id: string) => ClasseType | null;
  list: ClasseType[];
  loading: Boolean;
};

export type NewClasseData = {
  day: WeekDayEnum;
  frequency: ClasseFrequencyEnum;
  level: ClasseLevelEnum;
  spots: { base: number; max: number };
  time: string;
  type: ClasseTypeEnum;
};
