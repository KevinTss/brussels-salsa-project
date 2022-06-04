import { useContext, useEffect } from 'react';
import Router from 'next/router';

import { AuthContext } from '../contexts';
import type { AuthContext as AuthContextType } from '../types';

export const useAuth = () => {
  const data = useContext<AuthContextType>(AuthContext);

  const typedData: AuthContextType = {
    currentUser: data?.currentUser || undefined,
    isLoading: data?.isLoading || false,
    logout: data?.logout || (() => undefined),
    setCurrentUser: data?.setCurrentUser || (() => undefined),
    signUpWithEmail: data?.signUpWithEmail || (() => undefined),
    update: data?.update || (() => undefined),
    loginWithEmail: data?.loginWithEmail || (() => undefined),
  };

  return typedData;
};

export const useOnlyAuthGuard = () => {
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (typeof window !== undefined && !isLoading && !currentUser) {
      Router.push('/auth');
    }
  });

  return { currentUser, isLoading };
};
