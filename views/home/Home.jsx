import Link from 'next/link';

import { useAuth } from '../../hooks';
import ClassesList from '../../components/classes/classes-list';
import EventsCalendar from '../../components/event/events-calendar';

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
      {currentUser && (
        <>
          <ClassesList />
          <button onClick={logout}>Logout</button>
          <Link href='admin'>
            <a>Admin</a>
          </Link>
          <EventsCalendar />
        </>
      )}
    </main>
  );
};

export default Home;
