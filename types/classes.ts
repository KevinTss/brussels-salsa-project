import { WeekDayEnum } from './dates';

enum ClasseTypeEnum {
  BACHATA,
  SALSA,
}
enum ClasseLevelEnum {
  BEGINNER,
  IMPROVER,
}
enum ClasseFrequencyEnum {
  WEEKLY,
}

export type ClasseType = {
  day: string;
  frequency: string;
  id?: string;
  level: ClasseLevelEnum;
  spots: { base: number; max?: number };
  time: string;
  type: ClasseTypeEnum;
};

export type ClassesContext = {
  add: (data: NewClasseData) => Promise<void>;
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
