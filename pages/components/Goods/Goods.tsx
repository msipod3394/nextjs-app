import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { GoodsCard } from "./GoodsCard";
import { GoodsModal } from "./GoodsModal";

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
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure(); // useDisclosure：モーダルの開閉状態を管理
  const [selectedModal, setSelectedModal] = useState(null);

  // モーダル展開
  // idと一致するものをdataから見つけ、onOpenを実行
  const openModal = (modalId) => {
    setSelectedModal(books.find((item) => item.id === modalId));
    onOpen();
  };

  // API
  const [books, setBooks] = useState<BookData[]>([]);
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
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* GoodsCard */}
      <Flex w="full" p="6" gap="8" wrap="wrap" justifyContent="center">
        {books.map((item) => (
          <GoodsCard key={item.id} item={item} openModal={openModal} />
        ))}
      </Flex>

      {/* GoodsModal */}
      {selectedModal && (
        <GoodsModal
          isOpen={isOpen}
          onClose={onClose}
          selectedModal={selectedModal}
        />
      )}
    </>
  );
};
