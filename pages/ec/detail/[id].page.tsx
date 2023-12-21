import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../../layouts/layout";
import useSWR from "swr";
import { fetchData } from "../components/request";
import { getData } from "../index.page";
import { useCartContext } from "../components/CartContext";

type Props = {
  item: getData;
};

export default function ECDetail() {
  const { query } = useRouter();
  const { id } = query;

  /**
   * idに一致したアイテムの情報を再取得
   */
  // 取得した情報を管理
  const [item, setItem] = useState(null);

  // bookに取得した情報が入ったかを管理
  const [isProcessing, setIsProcessing] = useState(false);

  // 取得先URL
  const url = `https://www.googleapis.com/books/v1/volumes?q=${id}`;

  // SWR
  const { data, error, isLoading } = useSWR(url, fetchData);

  useEffect(() => {
    if (!isLoading && !error) {
      setItem(data[0]);
    }
    setIsProcessing(true);
  }, [data, error, isLoading]);

  /**
   * カートに入れる
   */
  const { addToCart } = useCartContext();

  // 商品情報を追加
  const handleAddCart = () => {
    addToCart(item);
  };

  return (
    <Layout>
      {isLoading ? (
        <Text align="center">読み込み中</Text>
      ) : error ? (
        <Text align="center">エラー: {error.message}</Text>
      ) : (
        <Container>
          <Stack mb="8" align="center">
            <Heading mb="4">{item?.volumeInfo.title}</Heading>
            <Image
              alt={item?.volumeInfo.title}
              src={item?.volumeInfo.imageLinks.thumbnail}
              width={240}
              height={240}
            />
          </Stack>
          <Stack mb="8">
            <Text>著者: {item?.volumeInfo.authors}</Text>
            <Text>出版日: {item?.volumeInfo.publishedDate}</Text>
            <Text>商品詳細: {item?.volumeInfo.description}</Text>
          </Stack>
          <Stack mb="4" align="center" spacing="50px">
            <Button onClick={handleAddCart} width="30%" colorScheme="blue">
              カートに入れる
            </Button>
            <Link href="/ec" passHref>
              <Button as="a" colorScheme="gray">
                一覧に戻る
              </Button>
            </Link>
          </Stack>
        </Container>
      )}
    </Layout>
  );
}
