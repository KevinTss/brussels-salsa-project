import Router from 'next/router';
import { createContext, useState, useEffect } from 'react';
import { firebaseAuth, fireStore } from '../../utils/firebase/clientApp';
import {
  AuthContext as AuthContextType,
  Children,
  User,
  UpdateUser,
} from '../../types';

const fireStoreInstance = fireStore.getFirestore();

export const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  isLoading: false,
  logout: () => undefined,
  setCurrentUser: () => undefined,
  signUpWithEmail: () => undefined,
  update: () => new Promise(() => { }),
  loginWithEmail: () => undefined,
  sendPasswordResetEmail: (email: string) => undefined,
});

export const AuthProvider = ({ children }: { children: Children }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      firebaseAuth.getAuth(),
      (firebaseUser) => {
        if (!firebaseUser) {
          setIsLoading(false);
          return;
        }

        fetch(firebaseUser.email as string).then(() => setIsLoading(false));

        return unsubscribe;
      }
    );
  }, []);

  const fetch = (id: string) => {
    const docRef = fireStore.doc(fireStoreInstance, 'users', id);

    return fireStore.getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const user = {
          id,
          ...docSnap.data(),
        } as User;
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

  const update = async (newData: UpdateUser): Promise<void> => {
    if (currentUser) {
      const documentRef = fireStore.doc(
        fireStoreInstance,
        'users',
        currentUser.id as string
      );

      // @ts-ignore
      delete newData.id;

      return fireStore.updateDoc(documentRef, newData);
    }

    return;
  };

  const signUpWithEmail = async (email: string, password: string) =>
    await firebaseAuth.createUserWithEmailAndPassword(
      firebaseAuth.getAuth(),
      email,
      password
    );

  const loginWithEmail = async (email: string, password: string) =>
    await firebaseAuth.signInWithEmailAndPassword(
      firebaseAuth.getAuth(),
      email,
      password
    );

  const sendPasswordResetEmail = async (email: string) =>
    await firebaseAuth.sendPasswordResetEmail(
      firebaseAuth.getAuth(),
      email,
    );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        logout,
        // @ts-ignore
        setCurrentUser,
        signUpWithEmail,
        update,
        loginWithEmail,
        sendPasswordResetEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
