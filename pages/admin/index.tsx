import type { NextPage } from 'next';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import Head from '../../components/head';
import AdminDashboard from '../../views/admin-dashboard';

const AdminPage: NextPage = () => (
  <DefaultLayout>
    <Head />
    <AdminDashboard />
  </DefaultLayout>
);

export default AdminPage;
