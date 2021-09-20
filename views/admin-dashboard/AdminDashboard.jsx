import Link from 'next/link';

import { useAuth } from '../../hooks';
import CreateClassForm from '../../components/classes/create-class-form';

const AdminDashboard = () => {
  const { currentUser, isLoading, logout } = useAuth();

  return (
    <main>
      <div>Admin</div>
      <CreateClassForm />
      <Link href='/'>
        <a>Back to home</a>
      </Link>
    </main>
  );
};

export default AdminDashboard;
