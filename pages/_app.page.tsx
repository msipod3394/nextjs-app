import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    // <CartProcider>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    // </CartProcider>
  );
}
