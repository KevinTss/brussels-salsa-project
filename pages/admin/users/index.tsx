import type { NextPage } from 'next';

import AdminLayout from '../../../components/layouts/AdminLayout';
import UsersList from '../../../components/users/list/UsersList';

const AdminUserPage: NextPage = () => (
  <AdminLayout>
    <UsersList />
  </AdminLayout>
);

export default AdminUserPage;
