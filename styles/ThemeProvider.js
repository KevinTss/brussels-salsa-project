import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  color: {
    primary: '#F9395C',
    border: '#dddddd',
    text: '#656686',
  },
  fontFamily: {
    default: "'Montserrat', sans-serif",
  },
  fontSize: {
    m: '1rem',
  },
  shadow: {
    default: '0 15px 45px 0 rgba(0, 0, 0, 0.1)',
  },
};

const TP = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

export default TP;
