import {
  AuthProvider,
  ClassesProvider,
  EventsProvider,
  UsersProvider,
} from '../../contexts';
import ThemeProvider from '../../styles/ThemeProvider';
import AdminGlobalStyle from '../../styles/AdminGlobalStyle';
import AdminSideMenu from '../admin/side-menu';
import AdminMain from '../admin/main';

const AdminLayout = ({ children }) => (
  <ThemeProvider>
    <AdminGlobalStyle />
    <AuthProvider>
      <UsersProvider>
        <EventsProvider>
          <ClassesProvider>
            <AdminSideMenu />
            <AdminMain>{children}</AdminMain>
          </ClassesProvider>
        </EventsProvider>
      </UsersProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AdminLayout;
