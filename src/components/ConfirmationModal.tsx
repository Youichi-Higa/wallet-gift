import { useNavigate } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from 'src/services';
import { paths } from 'src/assets';
import type { Wallet } from 'src/types';

type Props = {
  wallet?: Wallet;
  isOpen: boolean;
  onClose: () => void;
};

export const ConfirmationModal = (props: Props) => {
  const { wallet, isOpen, onClose } = props;

  const navigate = useNavigate();

  const getWallet = () => {
    if (wallet === undefined) return;
    // もらったwalletのデータ削除
    deleteDoc(doc(db, "wallets", wallet.id))

    // walletのデータを持って、完了画面に遷移
    navigate(paths.receipt, { state: wallet });
  };

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
          <Button colorScheme="blue" onClick={getWallet} >Wallet情報を見る</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
