import React, { useState, useEffect, use, useContext } from "react";
import Layout from "../../layouts/layout";
import { Box, Button, Flex, Input, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchData } from "./components/request";
import { CardListItem } from "./components/card";
// import useSWRMutation from "swr/mutation";
// import { CartContext } from "../_app.page";

// 取得したJSONデータの型定義
export type getData = {
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
 * ECコンポーネント
 */
export default function EC() {
  // API取得データ管理
  const [fetchedData, setFetchedData] = useState([]);

  // 件数管理（初期表示5件）
  const initVisibleItems = 10;
  const [visibleItems, setVisibleItems] = useState(initVisibleItems);

  // もっと見る
  const handleVisibleMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + initVisibleItems);
  };

  // キーワード窓
  const [searchKeyword, setSearchKeyword] = useState("");

  // 書籍データURL
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchKeyword}`;

  // SWR設定
  const { data, error, isLoading, isValidating } = useSWR(url, fetchData);

  // useContextの呼び出し
  // const cartProvider = useContext(CartContext);
  // console.log(cartProvider);
  // console.log(cartProvider['cart'].length);

  /**
   * データ通信
   */
  const handleSearchKeyword = () => {
    console.log(`検索キーワード：${searchKeyword}`);
    setSearchKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!isValidating && data) {
      setFetchedData(data);
    }
  }, [isValidating]);

  return (
    <Layout>
      <Box w="full">
        <VStack>
          {/* 検索ボタン */}
          <Flex w="40%">
            <Input
              w="80%"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            ></Input>
            <Button
              w="20%"
              ml="2"
              onClick={handleSearchKeyword}
              colorScheme="blue"
            >
              検索
            </Button>
          </Flex>
          <Flex w="full" p="2" gap="2" wrap="wrap" justifyContent="center">
            {fetchedData &&
              fetchedData.length > 0 &&
              fetchedData
                .slice(0, visibleItems)
                .map((item) => <CardListItem item={item}></CardListItem>)}
          </Flex>
        </VStack>
        {/* {visibleItems < fetchedData.length && (
          <Button onClick={handleVisibleMore} colorScheme="blue">
            もっと見る
          </Button>
        )} */}
      </Box>
    </Layout>
  );
}
