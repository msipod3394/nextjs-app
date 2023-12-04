import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Image from "next/image";

export const GoodsModal = ({ isOpen, onClose, selectedModal }) => {
  return (
    <>
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
    </>
  );
};
