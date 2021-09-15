import type { NextPage } from 'next';

import { firebaseAuth } from '../utils/firebase/clientApp';

const provider = new firebaseAuth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
  login_hint: 'keke@example.com',
});
const auth = firebaseAuth.getAuth();
auth.languageCode = 'en';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

const AuthPage: NextPage = () => (
  <div>
    <h3>Sign in</h3>
    <button
      onClick={() => {
        firebaseAuth
          .signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential =
              firebaseAuth.GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            console.log('token', token);
            console.log('user', user);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential =
              firebaseAuth.GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log('code', errorCode);
            console.log('error', error);
          });
      }}
    >
      Connect with google
    </button>
  </div>
);

export default AuthPage;
