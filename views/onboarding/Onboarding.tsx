import Router from 'next/router';

import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import { Spinner } from '../../components/ui';
import DancerRole from '../../components/onboarding/dancer-role';

const Onboarding = () => {
  const { currentUser, isLoading } = useOnlyAuthGuard();

  if (!isLoading && !!currentUser?.dancerRole) Router.push('/');

  return (
    <Main>
      {isLoading && <Spinner />}
      {!isLoading && <DancerRole />}
    </Main>
  );
};

export default Onboarding;
