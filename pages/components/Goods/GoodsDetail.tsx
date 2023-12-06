import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export const GoodsDetail: FC<Props> = () => {
  const router = useRouter();
  const { query } = router;

  // クエリパラメータを取得
  const id = Object.keys(query)
    .filter((key) => key !== "detail")
    .map((key) => `${key}=${query[key]}`)
    .join("&");

  // API通信中か完了かの判定
  const [loading, setLoading] = useState(true);

  /**
   * idに一致したアイテムの情報を再取得
   */
  // 取得した情報を管理するstate
  const [book, setBook] = useState<Props | null>(null);

  // 取得先URL
  const url = `https://www.googleapis.com/books/v1/volumes?q=SPY%C3%97FAMILY?${id}`;

  // データ通信
  useEffect(() => {
    // idが渡っていなかったら、一覧ページに戻る（⭐️ここ詰まったので聞く）
    if (!id) {
      router.push("/goods");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("ネットワークエラーです");
        }
        const data = await response.json();
        setBook(data.items[0] || null);
      } catch (error) {
        // エラー時
        console.error(error);
      } finally {
        // 通信が完了したら
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  return (
    <>
      {loading ? (
        /**
         * API通信完了前
         */
        <Text align="center">読み込み中</Text>
      ) : (
        /**
         * API通信完了後
         */
        <Container>
          <Stack mb="8" align="center">
            <Heading mb="4">{book.volumeInfo.title}</Heading>
            <Image
              alt={book.volumeInfo.title}
              src={book.volumeInfo.imageLinks.thumbnail}
              width={240}
              height={240}
            />
          </Stack>
          <Stack mb="8">
            <Text>著者: {book.volumeInfo.authors.join(", ")}</Text>
            <Text>出版日: {book.volumeInfo.publishedDate}</Text>
            <Text>商品詳細: {book.volumeInfo.description}</Text>
          </Stack>
          <Stack mb="4" align="center" spacing="50px">
            <Button
              width="50%"
              as="a"
              href={book.saleInfo.buyLink}
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
      )}
    </>
  );
};
