import AuthProvider from '../../contexts/auth';

const DefaultLayout = ({ children }) => {
  return <AuthProvider user={null}>{children}</AuthProvider>;
};

export default DefaultLayout;
