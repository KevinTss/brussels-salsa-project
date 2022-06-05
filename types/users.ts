import type { ClasseLevel } from './classes';
import type { DancerRole, Gender } from './common';

export type UserLevel = {
  bachata: ClasseLevel;
  salsa: ClasseLevel;
};

type Account = {
  id: string;
  type: 'google' | 'local';
};

export type User = {
  accessToken: string;
  accounts: Account[];
  avatarUrl: string | null;
  dancerRole?: DancerRole;
  email: string;
  fullName: string;
  gender: Gender;
  id: string;
  isAdmin: boolean;
  levels: UserLevel;
  phone: string | null;
};

export type NewUser = {
  accessToken: string;
  accounts: Account[];
  avatarUrl: string | null;
  dancerRole?: DancerRole;
  email: string;
  fullName: string;
  gender?: string;
  levels?: UserLevel;
  phone: string | null;
};

export type UpdateUser = {
  avatarUrl?: string;
  dancerRole?: DancerRole;
  email?: string;
  fullName?: string;
  gender?: Gender;
  levels?: UserLevel;
  phone?: string;
};

export type UsersContext = {
  add: (data: User, singleList?: boolean) => void;
  create: (data: NewUser) => void;
  edit: (id: string, data: UpdateUser) => void;
  getAll: () => void;
  getById: (id: string) => User | null;
  list: User[];
};
