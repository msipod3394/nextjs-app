import {
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  CardFooter,
  Flex,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { BookData } from "./index.page";
import Link from "next/link";


type Props = {
  item: BookData;
  // openModal: (id: string) => void;
};

export const GoodsCard: FC<Props> = ({
  item: { id, volumeInfo },
  // openModal,
}) => {
  return (
    <>
      <Card key={id} minW="300" maxW="sm" p="4">
        <CardBody>
          <Flex direction="column" alignItems="center">
            <Stack mt="2" spacing="3" align="center">
              <Image
                alt={volumeInfo.title}
                src={volumeInfo.imageLinks.thumbnail}
                width={100}
                height={100}
              />
              <Heading size="sm">{volumeInfo.title}</Heading>
              <Text>発売日：{volumeInfo.publishedDate}</Text>
            </Stack>
          </Flex>
        </CardBody>
        <CardFooter justifyContent="center" p="4">
          <Link key={id} href={`goods/detail?${id}`} passHref>
            <Button as="a" colorScheme="gray">
              詳しくみる
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
