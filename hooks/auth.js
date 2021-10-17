import { useContext, useEffect } from 'react';
import Router from 'next/router';

import { AuthContext } from '../contexts';

export const useAuth = () => useContext(AuthContext);

export const useOnlyAuthGuard = () => {
  const { currentUser, isLoading } = useAuth();

  useEffect(
    () =>
      typeof window !== undefined &&
      !isLoading &&
      !currentUser &&
      Router.push('/auth')
  );

  return { currentUser, isLoading };
};
