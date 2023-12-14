import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../../layouts/layout";
import useSWR from "swr";
import { fetchBooks } from "../request";

type Props = {
  id: string;
  volumeInfo: {
    title: string;
    publishedDate: string;
    description: string;
    authors: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  saleInfo: {
    buyLink: string;
  };
};

export default function GoodsDetail() {
  const router = useRouter();
  const { query } = useRouter();
  const { id } = query;

  /**
   * idに一致したアイテムの情報を再取得
   */
  // 取得した情報を管理
  const [book, setBook] = useState<Props | null>(null);

  // bookに取得した情報が入ったかを管理
  const [isProcessing, setIsProcessing] = useState(false);

  // 取得先URL
  const url = `https://www.googleapis.com/books/v1/volumes?q=SPY%C3%97FAMILY?${id}`;

  // SWR
  const { data, error, isLoading } = useSWR(url, fetchBooks);

  useEffect(() => {
    if (!isLoading && !error) {
      setBook(data[0]);
    }
    setIsProcessing(true);
  }, [data, error, isLoading]);
  // ⭐️ isLoadingがtrueになるタイミングとは？なぜ再レンダリングが起こらない？？

  return (
    <Layout>
      {isLoading ? (
        <Text align="center">読み込み中</Text>
      ) : error ? (
        <Text align="center">エラー: {error.message}</Text>
      ) : isProcessing ? (
        /**
         * ⭐️ isLoading が true になるタイミングだと、bookの中がnullでエラーになった。
         * useStateで状態管理を追加したが、いいやり方はないか？
         */
        <Container>
          <Stack mb="8" align="center">
            <Heading mb="4">{book?.volumeInfo.title}</Heading>
            <Image
              alt={book?.volumeInfo.title}
              src={book?.volumeInfo.imageLinks.thumbnail}
              width={240}
              height={240}
            />
          </Stack>
          <Stack mb="8">
            <Text>著者: {book?.volumeInfo.authors}</Text>
            <Text>出版日: {book?.volumeInfo.publishedDate}</Text>
            <Text>商品詳細: {book?.volumeInfo.description}</Text>
          </Stack>
          <Stack mb="4" align="center" spacing="50px">
            <Button
              width="50%"
              as="a"
              href={book?.saleInfo.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
            >
              購入する
            </Button>
            <Link href="/goods" passHref>
              <Button as="a" colorScheme="gray">
                一覧に戻る
              </Button>
            </Link>
          </Stack>
        </Container>
      ) : (
        ""
      )}
    </Layout>
  );
}
