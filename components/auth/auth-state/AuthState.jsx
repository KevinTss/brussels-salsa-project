import { useAuth } from '../../../hooks';
import { AuthStateContainer, InnerDropdown, MailContainer } from './style';
import { Avatar, Dropdown, Button } from '../../ui';

const AuthState = () => {
  const { currentUser, isLoading, logout } = useAuth();

  if (isLoading || !currentUser) return null;

  const [firstName, lastName] = currentUser.fullName.split(' ');

  return (
    <AuthStateContainer>
      <Dropdown
        content={
          <InnerDropdown>
            <MailContainer>{currentUser.email}</MailContainer>
            {currentUser.isAdmin && (
              <Button onClick={() => Router.push('/admin')}>Admin</Button>
            )}
            <Button onClick={logout}>Logout</Button>
          </InnerDropdown>
        }
      >
        <Avatar firstName={firstName} lastName={lastName} />
      </Dropdown>
    </AuthStateContainer>
  );
};

export default AuthState;
