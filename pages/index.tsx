import type { NextPage } from 'next'
import Head from 'next/head'
// import { useRouter } from 'next/router';

import DefaultLayout from '../components/layouts/DefaultLayout';
import Home from '../views/home';

const HomePage: NextPage = () => {
  // const router = useRouter();

  // if (false) return <p>Loading...</p>;

  // if (false) {
  //   router.push('/auth');
  //   return null;
  // }

  return (
    <DefaultLayout>
      <Head>
        <title>Brussels Salsa Project</title>
        <meta name='description' content='Salsa classes in Brussels' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Home />
    </DefaultLayout>
  );
};

export default HomePage;
