import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ToastContainerEl } from '../components/ui';
import theme from '../styles/theme'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../components/ui/toast/style.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <ToastContainerEl />
      {/* @ts-ignore: TODO: find why this is not working */}
      <Component {...pageProps} />
    </QueryClientProvider>
  </ChakraProvider>
);

export default MyApp;
