import type { ClasseLevelEnum } from './classes';

type UserLevel = {
  bachata: ClasseLevelEnum;
  salsa: ClasseLevelEnum;
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
  create: (data: NewUserData) => void;
  edit: (id: string, data: NewUserData) => void;
  getAll: () => void;
  getById: (id: string) => User | null;
  list: User[];
};
