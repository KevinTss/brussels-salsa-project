import Link from 'next/link';

import { useAuth } from '../../hooks';
import CreateClassForm from '../../components/classes/create-class-form';

const AdminDashboard = () => {
  const { currentUser, isLoading, logout } = useAuth();

  return (
    <main>
      <div>Admin</div>
      <CreateClassForm />
    </main>
  );
};

export default AdminDashboard;
