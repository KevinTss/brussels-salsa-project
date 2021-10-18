import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  color: {
    primary: '#F9395C',
    border: '#dddddd',
    text: '#656686',
    title: '#1d254f',
  },
  fontFamily: {
    default: "'Montserrat', sans-serif",
  },
  fontSize: {
    s: '0.8rem',
    m: '1rem',
    l: '1.4rem',
    xl: '2rem',
  },
  fontWeight: {
    thin: '400',
    bold: '700',
  },
  shadow: {
    default: '0 15px 45px 0 rgba(0, 0, 0, 0.1)',
  },
};

const TP = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

export default TP;
