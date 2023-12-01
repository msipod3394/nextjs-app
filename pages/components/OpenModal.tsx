import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export const OpenModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <p>ポップアップ</p>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>ModalTitle</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
                Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
                ullamco deserunt aute id consequat veniam incididunt duis in
                sint irure nisi. Mollit officia cillum Lorem ullamco minim
                nostrud elit officia tempor esse quis. Sunt ad dolore quis aute
                consequat. Magna exercitation reprehenderit magna aute tempor
                cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod
                sunt ex incididunt cillum quis. Velit duis sit officia eiusmod
                Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                nisi consectetur esse laborum eiusmod pariatur proident Lorem
                eiusmod et. Culpa deserunt nostrud ad veniam.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>Colose</Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
