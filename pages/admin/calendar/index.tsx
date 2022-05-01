import type { NextPage } from 'next';

import AdminLayout from '../../../components/layouts/AdminLayout';
import { AdminView } from '../../../types';
import Admin from '../../../views/admin'

const AdminCalendarPage: NextPage = () => (
  <AdminLayout>
    <Admin viewProps={AdminView.CALENDAR} />
  </AdminLayout>
);

export default AdminCalendarPage;
