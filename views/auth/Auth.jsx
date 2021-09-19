import { useState } from 'react';
import Router from 'next/router';

import { firebaseAuth, fireStore } from '../utils/firebase/clientApp';
import { useAuth } from '../hooks';

const googleProvider = new firebaseAuth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
googleProvider.setCustomParameters({
  login_hint: 'keke@example.com',
});
const auth = firebaseAuth.getAuth();
auth.languageCode = 'en';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  return (
    <div>
      <h3>Log in</h3>
      <button
        onClick={() => {
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
                console.log('no user', u);
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
                  fireStore.doc(
                    fireStore.getFirestore(),
                    'users',
                    newUser.email
                  ),
                  newUser
                );
              }
            })
            .then((res) => {
              console.log('res', res);
            })
            .catch((error) => {
              console.log('error', error);
              setIsLoading(false);
            });
        }}
      >
        Connect with google
        {isLoading && '...'}
      </button>
    </div>
  );
};

export default Auth;
