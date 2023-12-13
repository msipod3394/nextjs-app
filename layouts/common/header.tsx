import { Flex, Text, Link } from "@chakra-ui/react";

export const Header = () => {
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
      <Text fontSize="md" fontWeight="bold">
        <Link href="/">Home</Link>
      </Text>
      <Flex>
        <Text fontSize="md" fontWeight="bold" ml="4">
          <Link href="/goods">Goods</Link>
        </Text>
        <Text fontSize="md" fontWeight="bold" ml="4">
          <Link href="/form">ProfileForm</Link>
        </Text>
      </Flex>
    </Flex>
  );
};
