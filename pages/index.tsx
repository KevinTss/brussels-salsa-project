import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useClasses } from '../hooks';

import styles from '../styles/Home.module.css';
import { fireStore, firebaseAuth } from '../utils/firebase/clientApp';

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(firebaseAuth.getAuth());
  const { data } = useClasses();

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
        <ul>
          {data.map((c) => (
            <li key={c.id}>
              {c.id} : level - {c.level}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
