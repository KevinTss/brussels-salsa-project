import type { NextPage } from 'next';

import AdminLayout from '../../../components/layouts/AdminLayout';
import ClassesList from '../../../components/classes/classes-list'

const AdminClassesPage: NextPage = () => (
  <AdminLayout>
    <ClassesList />
  </AdminLayout>
);

export default AdminClassesPage;
