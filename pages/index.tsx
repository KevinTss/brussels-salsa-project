import type { NextPage } from 'next';

import DefaultLayout from '../components/layouts/DefaultLayout';
import Head from '../components/head';
import Home from '../views/home';

const HomePage: NextPage = () => (
  <DefaultLayout>
    <Head />
    <Home />
  </DefaultLayout>
);

export default HomePage;
