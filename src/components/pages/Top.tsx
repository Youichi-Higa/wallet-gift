import { useEffect, useState } from 'react';
import { Box, Flex, Image, Link, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ConfirmationModal, MessageCard } from 'src/components';
import { images, paths } from 'src/assets';
import { db } from 'src/services';
import type { Wallet } from 'src/types';

export const Top = () => {
  // firestoreから取得したwalletsのデータ
  const [wallets, setWallets] = useState<Wallet[]>([]);
  // ユーザーに選択されたwallet
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  // 確認モーダル開閉のフラグ
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  /** メッセージをクリックしてwalletを選択する関数 */
  const selectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setIsConfirmationModalOpen(true);
  };

  /** 確認モーダルを閉じる関数 */
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  /** firestoreからデータ取得する関数 */
  const getWalletsDocs = async () => {
    // 公開日が本日以前に設定されているwalletデータを取得するクエリ
    const q = query(collection(db, 'wallets'), where('publicDate', '<=', new Date()));
    // firestoreからデータ取得
    const querySnapshot = await getDocs(q);

    // 取得したquerySnapshotをループしてwalletsDocsに一時保存し、完了後にwalletsに保存
    const walletsDocs: Wallet[] = [];
    querySnapshot.docs.forEach((doc) => {
      const data = doc.data() as Omit<Wallet, 'id'>;
      walletsDocs.push({ id: doc.id, ...data });
    });
    setWallets(walletsDocs);
  };

  // 初回レンダリング時にfirestoreからデータ取得
  useEffect(() => {
    getWalletsDocs();
  }, []);

  return (
    <Flex justify="space-between">
      {/* 左側の画像エリア */}
      <Box minW="450px" h="100vh" position="sticky" top="0">
        {/* 画像 */}
        <Image src={images.getWallet} alt="Walletをあげる" h="100vh" position="sticky" top="0" />

        {/* 画像内の「Walletをあげる」ページへのリンクメッセージ */}
        <Box bg="white" p={2} w="75%" position="absolute" top="70%" left="15%">
          <Text
            fontSize="xs"
            color="#4776E6"
            sx={{ fontFamily: 'Noto Sans JP', fontWeight: 'bold' }}
          >
            不要なWalletがある方、死んだ後にそなえてだれかに
            <br />
            Walletあげたい方は
            <Link as={RouterLink} to={paths.form} sx={{ textDecoration: 'underline' }}>
              こちら
            </Link>
            からWallet情報を登録できます
          </Text>
        </Box>
      </Box>

      {/* 右側のメッセージ表示エリア */}
      <VStack w="70%" spacing="32px" p={20}>
        {wallets.map((wallet) => (
          <MessageCard
            key={wallet.id}
            message={wallet.messageToRecipient}
            onConfirmationModalOpen={() => selectWallet(wallet)}
          />
        ))}
      </VStack>

      {/* 確認モーダル */}
      <ConfirmationModal
        wallet={selectedWallet}
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
      />
    </Flex>
  );
};
