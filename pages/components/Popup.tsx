import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Divider,
  CardFooter,
  ButtonGroup,
  Box,
  Text,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

/**
 * 商品データ
 */
const data = [
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
 * Popup
 */
export const Popup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedModal, setSelectedModal] = React.useState(null);

  const openModal = (modalId) => {
    setSelectedModal(data.find((item) => item.id === modalId));
    onOpen();
  };

  return (
    <>
      {/* Card */}
      <Flex w="full" p="6" gap="8" wrap="wrap">
        {data.map((item) => (
          <Card
            minW="300"
            maxW="sm"
            key={item.id}
            onClick={() => openModal(item.id)}
          >
            <CardBody>
              <Flex direction="column" alignItems="center">
                <Stack mt="2" spacing="3" align="center">
                  <Image src={item.image} width={100} height={100} />
                  <Heading size="sm" mb="2">
                    {item.title}
                  </Heading>
                </Stack>
              </Flex>
            </CardBody>
            <CardFooter justifyContent="center">
              <Button key={item.id} onClick={() => openModal(item.id)}>
                詳しくみる
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Flex>

      {/* Modal */}
      {selectedModal && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent p={4}>
              <ModalHeader>{selectedModal.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody mb={10}>
                <Flex direction="column" alignItems="center">
                  <Image
                    src={selectedModal.image}
                    alt={selectedModal.title}
                    width={200}
                    height={200}
                  />
                  <p>{selectedModal.contents}</p>
                </Flex>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </>
  );
};
