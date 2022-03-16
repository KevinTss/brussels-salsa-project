import type { ClasseLevelEnum } from './classes';

type UserLevel = {
  salsa: ClasseLevelEnum;
  bachata: ClasseLevelEnum;
};

export type User = {
  email: string;
  fullName: string;
  gender: string;
  id?: string;
  levels?: UserLevel;
};

export type NewUserData = {
  email?: string;
  fullName?: string;
  gender?: string;
  id?: string;
  levels?: UserLevel;
};

export type UsersContext = {
  add: (data: User) => void;
  edit: (id: string, data: NewUserData) => void;
  getById: (id: string) => User | null;
  getAll: () => void;
  create: (data: NewUserData) => void;
  list: User[];
};
