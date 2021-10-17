import Router from 'next/router';

import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import EventsCalendar from '../../components/event/calendar';
import { Spinner } from '../../components/ui';

const Home = () => {
  const { currentUser, isLoading } = useOnlyAuthGuard();

  if (!isLoading && !currentUser.gender) Router.push('/onboarding');

  return (
    <Main>
      {(isLoading || !currentUser) && <Spinner />}
      {!isLoading && currentUser?.gender && <EventsCalendar />}
    </Main>
  );
};

export default Home;
