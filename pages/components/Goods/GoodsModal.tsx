import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";

export const GoodsModal = ({ isOpen, onClose, selectedModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent p={4}>
            <ModalHeader textAlign="center">
              {selectedModal.volumeInfo.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody mb={10}>
              <Center>
                <Image
                  src={selectedModal.volumeInfo.imageLinks.thumbnail}
                  alt={selectedModal.volumeInfo.title}
                  width={200}
                  height={200}
                />
              </Center>
              <Text mt={8} textAlign="left">
                発売日：{selectedModal.volumeInfo.publishedDate}
              </Text>
              <Text mt={4}>{selectedModal.volumeInfo.description}</Text>
              <Button w="full" mt={8} colorScheme="blue">
                <a href={selectedModal.saleInfo.buyLink} target="_blank">
                  購入する
                </a>
              </Button>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
