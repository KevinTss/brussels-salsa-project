import { Dispatch, SetStateAction } from 'react';

import { User, UpdateUser } from './users';

export type AuthContext = {
  currentUser: User | null;
  isLoading: boolean;
  logout: () => void;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  signUpWithEmail: (email: string, password: string) => any;
  update: (data: UpdateUser) => void;
  loginWithEmail: (email: string, password: string) => void;
};
