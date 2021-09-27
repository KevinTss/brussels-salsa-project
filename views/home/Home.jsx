import Link from 'next/link';

import { Main } from './style';
import { useAuth } from '../../hooks';
import EventsCalendar from '../../components/event/calendar';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <Main>
      {!currentUser && (
        <Link href='/auth'>
          <a>Login</a>
        </Link>
      )}
      {currentUser?.isAdmin && (
        <Link href='admin'>
          <a>Admin</a>
        </Link>
      )}
      {currentUser && <EventsCalendar />}
    </Main>
  );
};

export default Home;
