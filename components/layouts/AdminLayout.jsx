import { AuthProvider } from '../../contexts';
import ThemeProvider from '../../styles/ThemeProvider';
import AdminGlobalStyle from '../../styles/AdminGlobalStyle';
import AdminSideMenu from '../admin/side-menu';
import AdminMain from '../admin/main';

const AdminLayout = ({ children }) => (
  <ThemeProvider>
    <AdminGlobalStyle />
    <AuthProvider>
      <AdminSideMenu />
      <AdminMain>{children}</AdminMain>
    </AuthProvider>
  </ThemeProvider>
);

export default AdminLayout;
