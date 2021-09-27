import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  color: {
    primary: 'red',
  },
  fontFamily: {
    default: 'sans-serif',
  },
  fontSize: {
    m: '1rem',
  },
};

const TP = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

export default TP;
