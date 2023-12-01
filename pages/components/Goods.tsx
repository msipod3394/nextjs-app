import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { GoodsCard } from "./GoodsCard";
import { GoodsModal } from "./GoodsModal";

/**
 * 商品データの定義
 */
type DataType = {
  id: string;
  title: string;
  contents: string;
  image: string;
}[];

const data: DataType = [
  {
    id: "1",
    title: "色付リップクリーム",
    contents: "ハート型の2層リップスティック、ストロベリーの香り付き！",
    image: "/goods/goods_1.jpg",
  },
  {
    id: "2",
    title: "劇場版SPY×FAMILY 300ピースジグソーパズル",
    contents: "『劇場版 SPY×FAMILY CODE: White』よりジグソーパズルが新登場！",
    image: "/goods/goods_2.jpg",
  },
  {
    id: "3",
    title: "アクリルスタンド＆缶バッジセット",
    contents: "大好評デフォルメイラストシリーズから新商品登場！",
    image: "/goods/goods_3.jpg",
  },
  {
    id: "4",
    title: "SPY×FAMILY キービジュアルトートバッグ",
    contents: "キービジュアルのアーニャのイラストを使用したトートバッグ！",
    image: "/goods/goods_4.jpg",
  },
];

/**
 * Goodsコンポーネント
 */
export const Goods = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure(); // useDisclosure：モーダルの開閉状態を管理
  const [selectedModal, setSelectedModal] = useState(null);

  // モーダル展開
  // idと一致するものをdataから見つけ、onOpenを実行
  const openModal = (modalId) => {
    setSelectedModal(data.find((item) => item.id === modalId));
    onOpen();
  };

  return (
    <>
      {/* GoodsCard */}
      <Flex w="full" p="6" gap="8" wrap="wrap">
        {data.map((item) => (
          <GoodsCard key={item.id} item={item} openModal={openModal} />

          // <Card
          //   key={item.id}
          //   minW="300"
          //   maxW="sm"
          //   onClick={() => openModal(item.id)}
          // >
          //   <CardBody>
          //     <Flex direction="column" alignItems="center">
          //       <Stack mt="2" spacing="3" align="center">
          //         <Image
          //           alt={item.title}
          //           src={item.image}
          //           width={100}
          //           height={100}
          //         />
          //         <Heading size="sm" mb="2">
          //           {item.title}
          //         </Heading>
          //       </Stack>
          //     </Flex>
          //   </CardBody>
          //   <CardFooter justifyContent="center">
          //     <Button key={item.id} onClick={() => openModal(item.id)}>
          //       詳しくみる
          //     </Button>
          //   </CardFooter>
          // </Card>
        ))}
      </Flex>

      {/* GoodsModal */}
      {selectedModal && (
        <GoodsModal
          isOpen={isOpen}
          onClose={onClose}
          selectedModal={selectedModal}
        />

        // <Modal isOpen={isOpen} onClose={onClose}>
        //   <ModalOverlay>
        //     <ModalContent p={4}>
        //       <ModalHeader>{selectedModal.title}</ModalHeader>
        //       <ModalCloseButton />
        //       <ModalBody mb={10}>
        //         <Flex direction="column" alignItems="center">
        //           <Image
        //             src={selectedModal.image}
        //             alt={selectedModal.title}
        //             width={200}
        //             height={200}
        //           />
        //           <p>{selectedModal.contents}</p>
        //         </Flex>
        //       </ModalBody>
        //     </ModalContent>
        //   </ModalOverlay>
        // </Modal>
      )}
    </>
  );
};
