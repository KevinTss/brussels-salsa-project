import { AuthProvider, ClassesProvider } from '../../contexts';

const DefaultLayout = ({ children }) => (
  <AuthProvider user={null}>
    <ClassesProvider>{children}</ClassesProvider>
  </AuthProvider>
);

export default DefaultLayout;
