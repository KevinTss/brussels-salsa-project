import { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';

import { Main, AuthBox, LoginButton } from './style';
import { firebaseAuth, fireStore } from '../../utils/firebase/clientApp';
import { useAuth } from '../../hooks';

const googleProvider = new firebaseAuth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
googleProvider.setCustomParameters({
  login_hint: 'keke@example.com',
});
const auth = firebaseAuth.getAuth();
auth.languageCode = 'en';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  const onContinueWithGoogle = () => {
    setIsLoading(true);
    let u;

    firebaseAuth
      .signInWithPopup(auth, googleProvider)
      .then((result) => {
        u = result.user;

        const docRef = fireStore.doc(
          fireStore.getFirestore(),
          'users',
          u.email
        );

        return fireStore.getDoc(docRef);
      })
      .then((docSnap) => {
        if (docSnap.exists()) {
          setCurrentUser({
            id: u.email,
            ...docSnap.data(),
          });
          setIsLoading(false);
          Router.push('/');
        } else {
          setIsLoading(false);
          const newUser = {
            accessToken: u.accessToken,
            accounts: [{ type: 'google', id: u.uid }],
            avatarUrl: u.photoURL,
            email: u.email,
            fullName: u.displayName,
            phone: u.phoneNumber,
          };
          return fireStore.setDoc(
            fireStore.doc(fireStore.getFirestore(), 'users', newUser.email),
            newUser
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  if (currentUser) {
    Router.push('/');
  }

  return (
    <Main>
      <AuthBox>
        <h2>Log in</h2>
        <LoginButton onClick={onContinueWithGoogle} disabled={isLoading}>
          <Image
            alt='google icon'
            src='/img/icon-google.png'
            width='20px'
            height='20px'
          />
          Continue with google
        </LoginButton>
      </AuthBox>
    </Main>
  );
};

export default Auth;
