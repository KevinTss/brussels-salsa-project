import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';

import { Main } from './style';
import { useAuth } from '../../hooks';
import EventsCalendar from '../../components/event/calendar';

const Home = () => {
  const { currentUser } = useAuth();

  useEffect(
    () => typeof window !== undefined && !currentUser && Router.push('/auth')
  );

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
