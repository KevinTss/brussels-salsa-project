import {
  AuthProvider,
  ClassesProvider,
  EventsProvider,
  UsersProvider,
} from '../../contexts';
import Header from './header';
import ThemeProvider from '../../styles/ThemeProvider';
import GlobalStyle from '../../styles/GlobalStyle';

const DefaultLayout = ({ children }) => (
  <ThemeProvider>
    <GlobalStyle />
    <AuthProvider>
      <UsersProvider>
        <EventsProvider>
          <ClassesProvider>
            <Header />
            {children}
          </ClassesProvider>
        </EventsProvider>
      </UsersProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default DefaultLayout;
