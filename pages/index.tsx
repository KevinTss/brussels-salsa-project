import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useClasses, useAuth } from '../hooks';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { user, loading, logout } = useAuth();
  const { data } = useClasses();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  if (!loading && !user) {
    router.push('/auth');
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Brussels Salsa Project</title>
        <meta name='description' content='Salsa classes in Brussels' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>Hello {user?.fullName}</div>
        {!user && (
          <Link href='/auth'>
            <a>Login</a>
          </Link>
        )}
        {/* <ul>
          {data?.length &&
            data.map((c) => (
              <li key={c.id}>
                {c.id} : level - {c.level}
              </li>
            ))}
        </ul> */}
        {user && <button onClick={logout}>Logout</button>}
      </main>
    </div>
  );
};

export default Home;
