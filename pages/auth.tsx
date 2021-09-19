import type { NextPage } from 'next';

import Auth from '../views/auth';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Head from '../components/head';

const AuthPage: NextPage = () => (
  <DefaultLayout>
    <Head />
    <Auth />
  </DefaultLayout>
);

export default AuthPage;
