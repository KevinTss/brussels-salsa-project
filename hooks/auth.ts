import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Router from 'next/router';

import { fireStore, firebaseAuth } from '../utils/firebase/clientApp';

export const useAuth = () => {
  const [firebaseUser, firebaseUserLoading, firebaseUserError] = useAuthState(
    firebaseAuth.getAuth()
  );
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firebaseUserLoading || !!user) return;

    if (!firebaseUserLoading && !firebaseUser) return setLoading(false);

    const docRef = fireStore.doc(
      fireStore.getFirestore(),
      'users',
      firebaseUser.email as string
    );
    fireStore
      .getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setUser({
            id: firebaseUser.email,
            ...docSnap.data(),
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log('e', e);
        setError('no-user');
        setLoading(false);
      });
  }, [firebaseUser, user, firebaseUserLoading]);

  const set = (u) => setUser(u);

  const logout = () => {
    if (!user) return;

    firebaseAuth.signOut(firebaseAuth.getAuth()).then(() => {
      Router.push('/auth');
    });
  };

  return { user, loading, error, set, logout };
};
