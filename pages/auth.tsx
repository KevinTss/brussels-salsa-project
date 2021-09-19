import type { NextPage } from 'next';

import Auth from '../views/auth';
import DefaultLayout from '../components/layouts/DefaultLayout';

const AuthPage: NextPage = () => {
  return (
    <DefaultLayout>
      {/* <Head>
      <title>Brussels Salsa Project</title>
      <meta name='description' content='Salsa classes in Brussels' />
      <link rel='icon' href='/favicon.ico' />
    </Head> */}
      <Auth />
    </DefaultLayout>
  );
};

export default AuthPage;
