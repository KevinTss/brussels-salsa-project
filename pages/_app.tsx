import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'

import { ToastContainerEl } from '../components/ui';
import theme from '../styles/theme'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../components/ui/toast/style.css';



const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <ToastContainerEl />
    {/* @ts-ignore: TODO: find why this is not working */}
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
