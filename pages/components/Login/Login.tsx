import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from "@chakra-ui/react";

export const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" backgroundColor={formBackground} p={12} rounded={6}>
        <Heading mb={6}>ログイン</Heading>
        <Input
          placeholder="sample@chalra-ui.com"
          variant="filled"
          mb={3}
          type="email"
        ></Input>
        <Input
          placeholder="********"
          variant="filled"
          mb={6}
          type="password"
        ></Input>
        <Button colorScheme="teal" mb={6}>
          ログイン
        </Button>
        <Button onClick={toggleColorMode}>toggleColorMode</Button>
      </Flex>
    </Flex>
  );
};
