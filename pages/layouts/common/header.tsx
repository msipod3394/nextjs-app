import { Flex, Box, Text, Link } from "@chakra-ui/react";
// import Link from "next/link";

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
          <Link href="/todo">Todo（作成中）</Link>
        </Text>
      </Flex>
    </Flex>
  );
};
