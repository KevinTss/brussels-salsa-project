import type { NextPage } from 'next';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import Head from '../../components/head';
import Admin from '../../views/admin';

const AdminPage: NextPage = () => (
  <DefaultLayout>
    <Head />
    <Admin />
  </DefaultLayout>
);

export default AdminPage;
