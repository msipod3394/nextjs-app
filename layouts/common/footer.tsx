import { Flex, Text } from "@chakra-ui/react";

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
