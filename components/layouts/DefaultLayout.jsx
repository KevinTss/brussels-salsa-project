import { AuthProvider } from '../../contexts';
import Header from './header';
import ThemeProvider from '../../styles/ThemeProvider';
import GlobalStyle from '../../styles/GlobalStyle';

const DefaultLayout = ({ children }) => (
  <ThemeProvider>
    <GlobalStyle />
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  </ThemeProvider>
);

export default DefaultLayout;
