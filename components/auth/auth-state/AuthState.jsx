import { useAuth } from '../../../hooks';
import { AuthStateContainer } from './style';
import { Avatar, Dropdown, Button } from '../../ui';

const AuthState = () => {
  const { currentUser, isLoading, logout } = useAuth();

  if (isLoading || !currentUser) return null;

  const [firstName, lastName] = currentUser.fullName.split(' ');

  return (
    <AuthStateContainer>
      <Dropdown content={<Button onClick={logout}>Logout</Button>}>
        <Avatar firstName={firstName} lastName={lastName} />
      </Dropdown>
    </AuthStateContainer>
  );
};

export default AuthState;
