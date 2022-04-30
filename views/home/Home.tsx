import Router from 'next/router';

import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import EventsCalendar from '../../components/event/calendar';
import { Spinner } from '../../components/ui';
import { RoutePaths } from '../../types';

const Home = () => {
  const { currentUser, isLoading } = useOnlyAuthGuard();

  if (!isLoading && currentUser && !currentUser.dancerRole) Router.push(RoutePaths.ONBOARDING);

  return (
    <Main>
      {(isLoading || !currentUser) && <Spinner />}
      {!isLoading && currentUser?.dancerRole && <EventsCalendar />}
    </Main>
  );
};

export default Home;
