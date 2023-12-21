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
import NextLink from "next/link";

type Props = {
  item: getData;
};

export default function ECConfirm() {
  const { cartItems } = useCartContext();
  // console.log(cartItems);

  return (
    <Layout>
      <p>カートに入れたアイテム</p>
      <Container>
        {cartItems.map((item) => (
          <Stack key={item.id} mt="4">
            <Flex mb="8" align="center">
              <Image
                alt={item?.volumeInfo?.title ?? "情報なし"}
                src={item?.volumeInfo?.imageLinks?.thumbnail ?? "情報なし"}
                width={100}
                height={100}
              />
              <Stack ml="4">
                <Heading size="4" mb="2">
                  {item?.volumeInfo?.title ?? "情報なし"}
                </Heading>
                {/* <Text>価格: {item?.saleInfo.listPrice["amount"]}円</Text> */}
                <Text>著者: {item?.volumeInfo?.authors ?? "情報なし"}</Text>
                <Text>
                  価格: {item?.saleInfo?.listPrice?.amount ?? "情報なし"}円
                </Text>
                <Text>
                  出版日: {item?.volumeInfo?.publishedDate ?? "情報なし"}
                </Text>
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
          <NextLink href={`/ec`}>
            <Button as="a" colorScheme="gray" mt="10">
              一覧に戻る
            </Button>
          </NextLink>
        </Stack>
      </Container>
    </Layout>
  );
}
