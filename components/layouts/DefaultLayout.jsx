import { AuthProvider, ClassesProvider, EventsProvider } from '../../contexts';

const DefaultLayout = ({ children }) => (
  <AuthProvider user={null}>
    <EventsProvider>
      <ClassesProvider>{children}</ClassesProvider>
    </EventsProvider>
  </AuthProvider>
);

export default DefaultLayout;
