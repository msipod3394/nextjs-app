import { Flex, Box, Text, Link } from "@chakra-ui/react";
// import Link from "next/link";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      p="4"
      bg="gray.500"
      color="white"
      h="100%"
    >
      <Text fontSize="sm">Next.js SampleSite.</Text>
    </Flex>
  );
};
