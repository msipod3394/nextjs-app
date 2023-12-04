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
import { BookData } from "./Goods";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  item: BookData;
  openModal: (id: string) => void;
};

export const GoodsCard: FC<Props> = ({
  item: { id, volumeInfo, saleInfo },
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
          <Link key={id} href="">
            詳しくみる
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
