import { AuthProvider, EventsProvider, UsersProvider } from '../../contexts';
import Header from './header';
import ThemeProvider from '../../styles/ThemeProvider';
import GlobalStyle from '../../styles/GlobalStyle';

const DefaultLayout = ({ children }) => (
  <ThemeProvider>
    <GlobalStyle />
    <AuthProvider>
      <UsersProvider>
        <EventsProvider>
          <Header />
          {children}
        </EventsProvider>
      </UsersProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default DefaultLayout;
