import { HeaderContainer } from './style';
import { Logo } from '../../ui';
import AuthState from '../../auth/auth-state';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <AuthState />
    </HeaderContainer>
  );
};

export default Header;
