import type { AppProps } from 'next/app';

import { ToastContainerEl } from '../components/ui';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../components/ui/toast/style.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ToastContainerEl />
    <Component {...pageProps} />
  </>
);

export default MyApp;
