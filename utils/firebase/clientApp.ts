import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as store from 'firebase/firestore';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.getApps.length) {
  firebase.initializeApp(clientCredentials);
}

export const firebaseAuth = auth;
export const fireStore = store;

export default firebase;
// export default initializeApp(clientCredentials);
