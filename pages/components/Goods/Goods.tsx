import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoodsCard } from "./GoodsCard";

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
export const Goods = () => {
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
  const itemsPerPage = 3;

  /**
   * データ通信
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("ネットワークエラーです");
        }
        const data = await response.json();
        setBooks(data.items || []); // 取得したデータをbooksに格納
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 通信完了、state変更
      }
    };
    fetchData();
  }, []);

  /**
   * 降順・昇順機能
   * [フック] 読込完了時、昇降順の変更
   */
  useEffect(() => {
    if (!loading) {
      const sortedData = [...books].sort((a, b) => {
        const order = ascendingOrder ? 1 : -1;
        return a.volumeInfo.publishedDate > b.volumeInfo.publishedDate
          ? order
          : -order;
      });
      setBooks(sortedData);
      setCurrentPage(1); // 1ページ目に戻る
    }
  }, [loading, ascendingOrder]);

  /**
   * ページング機能
   */
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = books.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const toggleSortOrder = () => {
    setAscendingOrder((prevSetOrder) => !prevSetOrder);
  };

  return (
    <>
      {loading ? (
        <Text align="center">読み込み中</Text>
      ) : (
        <Box>
          <Center>
            <Button
              onClick={toggleSortOrder}
              colorScheme="blue"
              variant="outline"
            >
              {ascendingOrder ? "昇順に並び替える" : "降順に並び替える"}
            </Button>
          </Center>
          <Flex w="full" p="6" gap="8" wrap="wrap" justifyContent="center">
            {displayedBooks.map((item) => (
              <GoodsCard key={item.id} item={item} />
            ))}
          </Flex>
          <Center>
            <Button
              onClick={handlePrevPage}
              colorScheme="blue"
              variant="outline"
              disabled={currentPage === 1}
            >
              前のページ
            </Button>
            <Text mx="4">
              ページ {currentPage} / {totalPages}
            </Text>
            <Button
              onClick={handleNextPage}
              colorScheme="blue"
              variant="outline"
              disabled={currentPage === totalPages}
            >
              次のページ
            </Button>
          </Center>
        </Box>
      )}
    </>
  );
};
