import { WeekDay } from './dates';

export enum ClasseType {
  BACHATA = 'bachata',
  SALSA = 'salsa',
}

export enum ClasseLevel {
  BEGINNER,
  IMPROVER,
}

export enum ClasseFrequency {
  WEEKLY = 'weekly',
}

type ClasseSpot = {
  base: number;
  max?: number;
};

export type Classe = {
  day: WeekDay;
  frequency: ClasseFrequency;
  id: string;
  level: ClasseLevel;
  spots: ClasseSpot;
  time: string;
  type: ClasseType;
  balanceOffset: number;
  isArchived: boolean;
};

export type ClassesContext = {
  add: (data: NewClasse) => Promise<void>;
  deleteById: (id: string) => Promise<void>;
  edit: (id: string, data: NewClasse) => Promise<void>;
  getById: (id: string) => Classe | null;
  list: Classe[];
  loading: Boolean;
};

export type NewClasse = {
  day: WeekDay;
  frequency: ClasseFrequency;
  level: ClasseLevel;
  spots: { base: number; max: number };
  time: string;
  type: ClasseType;
  balanceOffset: number;
  isArchived: boolean;
};

export type ClasseUpdateData = {
  day?: WeekDay;
  level?: ClasseLevel;
  spots?: { base: number; max: number };
  time?: string;
  type?: ClasseType;
  balanceOffset?: number;
  isArchived?: boolean;
};
