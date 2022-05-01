import type { NextPage } from 'next';

import AdminLayout from '../../../components/layouts/AdminLayout';
import { AdminView } from '../../../types';
import Admin from '../../../views/admin'

const AdminUserPage: NextPage = () => (
  <AdminLayout>
    <Admin viewProps={AdminView.USERS} />
  </AdminLayout>
);

export default AdminUserPage;
