import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useCartContext } from "../../pages/ec/components/CartContext";
import { useRouter } from "next/router";
import NextLink from "next/link";

export const Header = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { itemCount } = useCartContext();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p="4"
      bg="gray.500"
      color="white"
      h="100%"
    >
      <Flex>
        <Text fontSize="md" fontWeight="bold">
          <ChakraLink href="/">Home</ChakraLink>
        </Text>
        <Text fontSize="md" fontWeight="bold" ml="4">
          <ChakraLink href="/goods">Goods</ChakraLink>
        </Text>
        <Text fontSize="md" fontWeight="bold" ml="4">
          <ChakraLink href="/form">ProfileForm</ChakraLink>
        </Text>
        <Text fontSize="md" fontWeight="bold" ml="4">
          <NextLink href={`/ec/`}>EC</NextLink>
        </Text>
      </Flex>
      <Flex>
        <Text fontSize="md" fontWeight="bold" ml="4">
          カート: {itemCount}
        </Text>
        <Text fontSize="md" fontWeight="bold" ml="4">
          <NextLink href={`/ec/confirm/`}>購入する</NextLink>
        </Text>
      </Flex>
    </Flex>
  );
};
