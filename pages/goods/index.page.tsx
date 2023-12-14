import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoodsCard } from "./card";
import Layout from "../../layouts/layout";
import useSWR from "swr";
import { fetchBooks } from "./request";

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
};

/**
 * Goodsコンポーネント
 */
export default function Goods() {
  // ルーター初期化
  const router = useRouter();

  // 書籍データURL
  const url = "https://www.googleapis.com/books/v1/volumes?q=SPY%C3%97FAMILY";

  // 通信が完了したかを管理
  const [loading, setLoading] = useState(true);

  // 取得データの管理
  const [books, setBooks] = useState<BookData[]>([]);

  // 降順・昇順の管理
  const [ascendingOrder, setAscendingOrder] = useState(false);

  // ページャーのページ番号管理
  const [currentPage, setCurrentPage] = useState(1);

  // 1ページの表示件数
  const itemsPerPage = 4;

  const { data, error, isLoading } = useSWR(url, fetchBooks);

  /**
   * データ通信
   */
  useEffect(() => {
    if (!isLoading) {
      const sortedData = [...data].sort((a, b) => {
        const order = ascendingOrder ? 1 : -1;
        return a.volumeInfo.publishedDate > b.volumeInfo.publishedDate
          ? order
          : -order;
      });
      setBooks(sortedData);
      setCurrentPage(1); // 1ページ目に戻る
    }
  }, [isLoading, ascendingOrder, data]);

  if (isLoading) {
    return (
      <Layout>
        <Text align="center">読み込み中</Text>
      </Layout>
    );
  }

  const toggleSortOrder = () => {
    setAscendingOrder((prevSetOrder) => !prevSetOrder);
  };

  return (
    <Layout>
      <Box w="full">
        <Center>
          <Button
            onClick={toggleSortOrder}
            colorScheme="blue"
            variant="outline"
          >
            {ascendingOrder ? "昇順に並び替える" : "降順に並び替える"}
          </Button>
        </Center>
        <Flex
          w="full"
          p="4"
          marginY="20px"
          gap="8"
          wrap="wrap"
          justifyContent="center"
        >
          {books.map((item) => (
            <GoodsCard key={item.id} item={item} />
          ))}
        </Flex>
      </Box>
    </Layout>
  );
}
