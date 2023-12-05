import {
  useDisclosure,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  CardFooter,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * 商品データの定義
 */
// 取得したJSONデータの型定義
export type BookData = {
  id: string;
  volumeInfo: {
    title: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  saleInfo: {
    buyLink: string;
  };
};

/**
 * Goodsコンポーネント
 */
export const Goods = () => {
  // ルーターを初期化
  const router = useRouter();

  // API通信中か完了かの判定
  const [loading, setLoading] = useState(true);

  // モーダル展開
  // const { isOpen, onOpen, onClose, onToggle } = useDisclosure(); // useDisclosure：モーダルの開閉状態を管理
  // const [selectedModal, setSelectedModal] = useState<BookData | null>(null);
  // idと一致するものをdataから見つけ、onOpenを実行
  // const openModal = (modalId) => {
  //   setSelectedModal(books.find((item) => item.id === modalId));
  //   onOpen();
  // };

  // 取得した情報を管理するstate
  const [books, setBooks] = useState<BookData[]>([]);

  // 取得先URL
  const url = "https://www.googleapis.com/books/v1/volumes?q=SPY%C3%97FAMILY";

  // データ通信
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("ネットワークエラーです");
        }
        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        // エラー時
        console.error(error);
      } finally {
        // 通信が完了したら
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        /* GoodsCard */
        <Flex w="full" p="6" gap="8" wrap="wrap" justifyContent="center">
          {books.map(({ id, volumeInfo, saleInfo }) => (
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
          ))}
        </Flex>
      )}
    </>
  );
};
