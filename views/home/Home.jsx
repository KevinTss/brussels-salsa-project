import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';

import { Main } from './style';
import { useAuth } from '../../hooks';
import EventsCalendar from '../../components/event/calendar';

const Home = () => {
  const { currentUser, isLoading } = useAuth();

  useEffect(
    () =>
      typeof window !== undefined &&
      !isLoading &&
      !currentUser &&
      Router.push('/auth')
  );

  return (
    <Main>
      {!currentUser && (
        <Link href='/auth'>
          <a>Login</a>
        </Link>
      )}
      {currentUser && <EventsCalendar />}
    </Main>
  );
};

export default Home;
