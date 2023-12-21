import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../layouts/layout";
import { getData } from "./index.page";
import { useCartContext } from "./components/CartContext";

type Props = {
  item: getData;
};

export default function ECConfirm() {
  const { cartItems } = useCartContext();

  console.log(cartItems);

  return (
    <Layout>
      <p>カートに入れたアイテム</p>
      <Container>
        {cartItems.map((item) => (
          <Stack key={item.id} mt="4">
            <Flex mb="8" align="center">
              <Image
                alt={item?.volumeInfo.title}
                src={item?.volumeInfo.imageLinks.thumbnail}
                width={100}
                height={100}
              />
              <Stack ml="4">
                <Heading size="4" mb="2">
                  {item?.volumeInfo.title}
                </Heading>
                <Text>著者: {item?.volumeInfo.authors}</Text>
                <Text>価格: {item?.saleInfo.listPrice["amount"]}円</Text>
                <Text>出版日: {item?.volumeInfo.publishedDate}</Text>
              </Stack>
            </Flex>
          </Stack>
        ))}
        <Stack mt="8" align="center" justifyContent="center" gap="5">
          <Link href="/ec/buy" passHref>
            <Button as="a" colorScheme="blue">
              購入する
            </Button>
          </Link>
          <Link href="/ec" passHref>
            <Button as="a" colorScheme="gray" mt="10">
              一覧に戻る
            </Button>
          </Link>
        </Stack>
      </Container>
    </Layout>
  );
}
