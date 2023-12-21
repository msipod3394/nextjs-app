import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { CartContextProvider, useCartContext } from './ec/components/CartContext';

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <ChakraProvider>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </ChakraProvider>
  );
};

export default App;
