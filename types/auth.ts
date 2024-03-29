import { Dispatch, SetStateAction } from 'react';

import { User, UpdateUser } from './users';

export type AuthContext = {
  currentUser: User | undefined;
  isLoading: boolean;
  logout: () => void;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  signUpWithEmail: (email: string, password: string) => any;
  update: (data: UpdateUser) => Promise<void>;
  loginWithEmail: (email: string, password: string) => void;
};
