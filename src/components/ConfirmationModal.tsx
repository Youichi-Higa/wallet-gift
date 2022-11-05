import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConfirmationModal = (props: Props) => {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wallet情報を見る画面に進みます</ModalHeader>
        <ModalBody>1度選ぶと選択し直すことはできません</ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            選び直す
          </Button>
          <Button colorScheme="blue">Wallet情報を見る</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
