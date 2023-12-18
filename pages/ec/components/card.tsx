import React from "react";
import { getData } from "../index.page";
import { FC } from "react";
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
import Link from "next/link";

type Props = {
  item: getData;
};

export const CardListItem: FC<Props> = ({ item: { id, volumeInfo } }) => {
  return (
    <>
      <Card key={id} minW="270" maxW="sm" p="2">
        <CardBody>
          <Flex direction="column" alignItems="center">
            <Stack mt="2" spacing="3" align="center">
              <Image
                alt={volumeInfo.title}
                src={
                  volumeInfo.imageLinks.thumbnail
                    ? volumeInfo.imageLinks.thumbnail
                    : "noimage.jpg"
                }
                width={100}
                height={100}
              />
              <Heading size="sm">{volumeInfo.title}</Heading>
              <Text>発売日：{volumeInfo.publishedDate}</Text>
            </Stack>
          </Flex>
        </CardBody>
        <CardFooter justifyContent="center" p="4">
          <Link key={id} href={`goods/detail/${id}`} passHref>
            <Button as="a" colorScheme="gray">
              詳しくみる
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
