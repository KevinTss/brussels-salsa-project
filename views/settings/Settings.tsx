import Router from 'next/router';

import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import { RoutePaths } from '../../types';
import { Text, Title, SubTitle } from '../../styles/GlobalStyle';

export default function Settings() {
  const { currentUser, isLoading } = useOnlyAuthGuard();

  if (!isLoading && currentUser && !currentUser.gender)
    Router.push(RoutePaths.ONBOARDING);

  return (
    <Main>
      <Title>My profile</Title>
      <Text>
        <strong>Email:</strong> {currentUser?.email}
      </Text>
      <Text>
        <strong>Full name:</strong> {currentUser?.fullName}
      </Text>
      <SubTitle>Levels</SubTitle>
      <Text>
        <strong>salsa:</strong> {currentUser?.levels?.salsa}
      </Text>
      <Text>
        <strong>bachata:</strong> {currentUser?.levels?.bachata}
      </Text>
    </Main>
  );
}
