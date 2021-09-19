import Link from 'next/link';

import { useAuth } from '../../hooks';
import ClassesList from '../../components/classes/classes-list';

const Home = () => {
  const { currentUser, isLoading, logout } = useAuth();

  return (
    <main>
      <div>Hello {currentUser?.fullName}</div>
      {!currentUser && (
        <Link href='/auth'>
          <a>Login</a>
        </Link>
      )}
      <ClassesList />
      {currentUser && <button onClick={logout}>Logout</button>}
    </main>
  );
};

export default Home;
