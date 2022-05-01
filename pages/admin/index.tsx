import type { NextPage } from 'next';

import AdminLayout from '../../components/layouts/AdminLayout';
import Head from '../../components/head';
import Admin from '../../views/admin';

const AdminPage: NextPage = () => (
  <AdminLayout>
    <Head />

    {/* <Admin /> */}
  </AdminLayout>
);

export default AdminPage;
