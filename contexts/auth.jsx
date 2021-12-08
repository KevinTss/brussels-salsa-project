import Router from 'next/router';
import { createContext, useState, useEffect } from 'react';
import { firebaseAuth, fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

export const AuthContext = createContext(null);

export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      firebaseAuth.getAuth(),
      (firebaseUser) => {
        if (!firebaseUser) {
          setIsLoading(false);
          return;
        }

        fetch(firebaseUser?.email).then(() => setIsLoading(false));

        return unsubscribe;
      }
    );
  }, []);

  const fetch = (id) => {
    const docRef = fireStore.doc(fireStoreInstance, 'users', id);

    return fireStore.getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const user = {
          id,
          ...docSnap.data(),
        };
        setCurrentUser(user);
      }
    });
  };

  const logout = () => {
    if (!currentUser) return;

    firebaseAuth.signOut(firebaseAuth.getAuth()).then(() => {
      Router.push('/auth');
    });
  };

  const update = async (newData) => {
    const documentRef = fireStore.doc(
      fireStoreInstance,
      'users',
      currentUser.id
    );

    delete newData.id;

    return fireStore.updateDoc(documentRef, newData);
  };

  const signUpWithEmail = async (email, password) =>
    await firebaseAuth.createUserWithEmailAndPassword(
      firebaseAuth.getAuth(),
      email,
      password
    );

  const loginWithEmail = async (email, password) =>
    await firebaseAuth.signInWithEmailAndPassword(
      firebaseAuth.getAuth(),
      email,
      password
    );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        logout,
        setCurrentUser,
        signUpWithEmail,
        update,
        loginWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
