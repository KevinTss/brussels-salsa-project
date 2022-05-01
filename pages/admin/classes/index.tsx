import type { NextPage } from 'next';

import AdminLayout from '../../../components/layouts/AdminLayout';
import { AdminView } from '../../../types';
import Admin from '../../../views/admin'

const AdminClassesPage: NextPage = () => (
  <AdminLayout>
    <Admin viewProps={AdminView.CLASSES} />
  </AdminLayout>
);

export default AdminClassesPage;
