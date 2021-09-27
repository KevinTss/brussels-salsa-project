import { AuthProvider, ClassesProvider, EventsProvider } from '../../contexts';
import Header from './header';
import ThemeProvider from '../../styles/ThemeProvider';
import GlobalStyle from '../../styles/GlobalStyle';

const DefaultLayout = ({ children }) => (
  <ThemeProvider>
    <GlobalStyle />
    <AuthProvider user={null}>
      <EventsProvider>
        <ClassesProvider>
          <Header />
          {children}
        </ClassesProvider>
      </EventsProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default DefaultLayout;
