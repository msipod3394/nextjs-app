import {
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  CardFooter,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";

export const GoodsCard = ({ item: { id, title, image }, openModal }) => {
  return (
    <>
      <Card key={id} minW="300" maxW="sm" onClick={() => openModal(id)}>
        <CardBody>
          <Flex direction="column" alignItems="center">
            <Stack mt="2" spacing="3" align="center">
              <Image alt={title} src={image} width={100} height={100} />
              <Heading size="sm" mb="2">
                {title}
              </Heading>
            </Stack>
          </Flex>
        </CardBody>
        <CardFooter justifyContent="center">
          <Button key={id} onClick={() => openModal(id)}>
            詳しくみる
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
