import Router from 'next/router';

import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import { Spinner } from '../../components/ui';
import Gender from '../../components/onboarding/gender';

const Onboarding = () => {
  const { currentUser, isLoading } = useOnlyAuthGuard();

  if (!isLoading && currentUser?.danceRole) Router.push('/');

  return (
    <Main>
      {isLoading && <Spinner />}
      {!isLoading && <Gender />}
    </Main>
  );
};

export default Onboarding;
