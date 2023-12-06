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
  // ルーターを初期化
  const router = useRouter();

  // 取得先URL
  const url = "https://www.googleapis.com/books/v1/volumes?q=SPY%C3%97FAMILY";

  /**
   * state
   */
  // API通信が完了したかを管理するstate
  const [loading, setLoading] = useState(true);

  // 取得した情報を管理するstate
  const [books, setBooks] = useState<BookData[]>([]);

  // 昇順・降順の切替状況を管理するstate
  const [ascendingOrder, setAscendingOrder] = useState(false); // 初期値は降順

  /**
   * api通信
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("ネットワークエラーです");
        }
        const data = await response.json();

        // // 発売日が新しい順に並び替え
        // const sortedData = data.items.sort((a, b) => {
        //   const order = ascendingOrder ? 1 : -1; // ここで useStateのascendingOrderを見に行く
        //   // setStateで確認したorderの値で並び替え
        //   return a.volumeInfo.publishedDate > b.volumeInfo.publishedDate
        //     ? order
        //     : -order;
        // });
        // console.log(sortedData);

        setBooks(data.items || []); // 配列にセット
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

  /**
   * 昇順・降順の切替機能
   */
  useEffect(() => {
    // booksをコピーして新しい配列を作る→ascendingOrderの状況をみてソート
    const sortedData = [...books].sort((a, b) => {
      const order = ascendingOrder ? 1 : -1; // ここで useStateのascendingOrderを見に行く

      // setStateで確認したorderの値で並び替え
      return a.volumeInfo.publishedDate > b.volumeInfo.publishedDate
        ? order
        : -order;
    });
    // console.log(sortedData);

    setBooks(sortedData);
  }, [ascendingOrder]); // ascendingOrderの状態が変化したら

  const toggleSortOrder = () => {
    setAscendingOrder((prevSetOrder) => !prevSetOrder); // stateを反転させる
  };

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
        <Box>
          <Center>
            {/* 昇順・降順の切替機能 */}
            <Button
              onClick={toggleSortOrder}
              colorScheme="blue"
              variant="outline"
            >
              {ascendingOrder ? "昇順に並び替える" : "降順に並び替える"}
            </Button>
          </Center>
          {/* カードの展開 */}
          <Flex w="full" p="6" gap="8" wrap="wrap" justifyContent="center">
            {books.map((item) => (
              <GoodsCard key={item.id} item={item} />
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
};
