import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from '../styles/Home.module.css';
import { firebaseAuth } from '../utils/firebase/clientApp';

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(firebaseAuth.getAuth());

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Something wrong happened...</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Brussels Salsa Project</title>
        <meta name='description' content='Salsa classes in Brussels' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>Hello {user?.displayName}</div>
        <Link href='/auth'>
          <a>Login</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
