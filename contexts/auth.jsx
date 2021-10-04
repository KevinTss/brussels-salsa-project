import { createContext, useState, useEffect } from 'react';
import { firebaseAuth, fireStore } from '../utils/firebase/clientApp';

export const AuthContext = createContext(null);

export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      firebaseAuth.getAuth(),
      (firebaseUser) => {
        if (!firebaseUser) {
          return;
        }
        const docRef = fireStore.doc(
          fireStore.getFirestore(),
          'users',
          firebaseUser?.email
        );
        fireStore
          .getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setCurrentUser({
                id: firebaseUser.email,
                ...docSnap.data(),
              });
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          })
          .catch((e) => {
            console.log('error', e);
            setIsLoading(false);
          });

        return unsubscribe;
      }
    );
  }, []);

  const logout = () => {
    if (!currentUser) return;

    firebaseAuth.signOut(firebaseAuth.getAuth()).then(() => {
      Router.push('/auth');
    });
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
