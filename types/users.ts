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

export type User = {
  access?: string[];
  email: string;
  fullName: string;
  gender: string;
  id?: string;
};

export type NewUserData = {
  access?: string[];
  email?: string;
  fullName?: string;
  gender?: string;
};

export type UsersContext = {
  add: (data: User) => Promise<void>;
  edit: (id: string, data: NewUserData) => Promise<void>;
  getById: (id: string) => User | null;
  getAll: () => User[] | [];
  create: (data: NewUserData) => Promise<void>;
  list: User[];
};
