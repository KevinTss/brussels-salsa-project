import { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import { useFormik } from 'formik';

import { Main, AuthBox, LoginButton, OrSeparation, Form, Text } from './style';
import { firebaseAuth, fireStore } from '../../utils/firebase/clientApp';
import { useAuth, useUsers } from '../../hooks';
import { Button, Field, triggerToast } from '../../components/ui';

const googleProvider = new firebaseAuth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  login_hint: 'keke@example.com',
});
const auth = firebaseAuth.getAuth();
auth.languageCode = 'en';

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setCurrentUser, signUpWithEmail, loginWithEmail } =
    useAuth();
  const { create: createUser } = useUsers();
  const { handleSubmit: handleSubmitLogin, handleChange: handleChangeLogin } =
    useFormik({
      initialValues: { email: '', password: '' },
      onSubmit: async (values) => {
        console.log(values);
        try {
          const response = await loginWithEmail(values.email, values.password);
          console.log('response', response);
          Router.push('/');
        } catch (error) {
          if (error.code === 'auth/wrong-password') {
            triggerToast.error('Password is not correct');
          } else if (error.code === 'auth/user-not-found') {
            triggerToast.error("Email doesn't exist, try to sign up");
          } else {
            triggerToast.error('An error occurred, try later or contact us');
            console.dir(error);
          }
        }
      },
    });
  const { handleSubmit: handleSubmitSignUp, handleChange: handleChangeSignUp } =
    useFormik({
      initialValues: { first: '', last: '', email: '', password: '' },
      onSubmit: async (values) => {
        console.log(values);
        try {
          const response = await signUpWithEmail(values.email, values.password);
          console.log('res', response);
          createUser({
            email: response.user.email,
            accessToken: response.user.accessToken,
            accounts: [{ type: 'local', id: response.user.uid }],
            avatarUrl: response.user.photoURL,
            email: response.user.email,
            fullName: `${values.first} ${values.last}`,
            phone: response.user.phoneNumber,
          });
          Router.push('/');
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            triggerToast.error('This email is already used, try to login');
          } else {
            triggerToast.error('An error occurred, try later or contact us');
            console.warn(error);
          }
        }
      },
    });

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
          return createUser({
            accessToken: u.accessToken,
            accounts: [{ type: 'google', id: u.uid }],
            avatarUrl: u.photoURL,
            email: u.email,
            fullName: u.displayName,
            phone: u.phoneNumber,
          });
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
        {mode === 'login' ? (
          <>
            <h2>Log in</h2>
            <Form onSubmit={handleSubmitLogin}>
              <Field
                placeholder='Email'
                name='email'
                type='email'
                onChange={handleChangeLogin}
              />
              <Field
                placeholder='Password'
                name='password'
                type='password'
                onChange={handleChangeLogin}
              />
              <LoginButton type='submit'>
                <Image
                  alt='google icon'
                  src='/img/icon-mail.png'
                  width='20px'
                  height='20px'
                />
                Login with email
              </LoginButton>
              <Text>
                {"Don't have an account yet? "}
                <Button onClick={() => setMode('sign-up')}>Sign-up</Button>
              </Text>
            </Form>
          </>
        ) : (
          <>
            <h2>Sign up</h2>
            <Form onSubmit={handleSubmitSignUp}>
              <Field
                placeholder='First name'
                name='first'
                type='text'
                onChange={handleChangeSignUp}
              />
              <Field
                placeholder='Last name'
                name='last'
                type='text'
                onChange={handleChangeSignUp}
              />
              <Field
                placeholder='Email'
                name='email'
                type='email'
                onChange={handleChangeSignUp}
              />
              <Field
                placeholder='Password'
                name='password'
                type='password'
                onChange={handleChangeSignUp}
              />
              <LoginButton type='submit'>
                <Image
                  alt='google icon'
                  src='/img/icon-mail.png'
                  width='20px'
                  height='20px'
                />
                Sign up with email
              </LoginButton>
              <Text>
                {'Already have an account? '}
                <Button onClick={() => setMode('login')}>Login</Button>
              </Text>
            </Form>
          </>
        )}

        <OrSeparation>Or</OrSeparation>
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
